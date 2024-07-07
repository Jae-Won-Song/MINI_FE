import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import UserService from "./user";
import Service from "src/service";

const openURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 오픈된 api를 호출 시 사용합니다.
export const apiWithNoToken: AxiosInstance = axios.create({
  baseURL: openURL,
});

apiWithNoToken.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  (err) => {
    return Promise.reject(err.response.data);
  }
);

const closedURL = process.env.NEXT_PUBLIC_API_URL;

// 사용자 인증(accessToken)이 필요한 api를 호출 시 사용합니다.
export const apiWithToken: AxiosInstance = axios.create({
  baseURL: closedURL,
});

// 인터셉터가 모든 api 호출에 대해 헤더정보를 삽입합니다.
apiWithToken.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  const token = Service.LocalStorage.AccessToken.get();
  if (!token) return req;
  req.headers["Authorization"] = `Bearer ${token}`;
  req.withCredentials = true;
  return req;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRrefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

async function refreshToken(): Promise<string> {
  const response = await Api.User.refreshTokens();
  console.error(response)
  alert(response)
  const { accessToken } = response.data;
  Service.LocalStorage.AccessToken.set(accessToken)
  return accessToken;
}

apiWithToken.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          alert("요청 보냄")
          const newToken = await refreshToken();
          isRefreshing = false;
          onRrefreshed(newToken);
          refreshSubscribers = [];
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(err.response.data);
  }
);

export const Api = {
  User: UserService,
};
