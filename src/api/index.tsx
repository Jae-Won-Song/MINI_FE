import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import UserService from './user';
import Service from 'src/service';

const openURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 오픈된 api를 호출 시 사용합니다.
export const apiWithNoToken: AxiosInstance = axios.create({
  baseURL: openURL,
  withCredentials: true,
});

apiWithNoToken.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  (err) => {
    return Promise.reject(err.response.data);
  },
);

const closedURL = process.env.NEXT_PUBLIC_API_URL;

// 사용자 인증(accessToken)이 필요한 api를 호출 시 사용합니다.
export const apiWithToken: AxiosInstance = axios.create({
  baseURL: closedURL,
  withCredentials: true,
});

// 인터셉터가 모든 api 호출에 대해 헤더 정보를 삽입합니다.
apiWithToken.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  const token = Service.LocalStorage.AccessToken.get();
  if (!token) return req;
  req.headers['Authorization'] = `Bearer ${token}`;
  req.withCredentials = true;
  return req;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRrefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

async function refreshToken(): Promise<string> {
  const token = Service.LocalStorage.AccessToken.get();
  console.log('액세스 토큰', token);
  if (!token) throw new Error('액세스 토큰 사용 불가');
  const response = await Api.User.refreshTokens();
  const { accessToken } = response.data;
  Service.LocalStorage.AccessToken.set(accessToken);
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
      // 401 오류가 발생한 경우
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await UserService.refreshTokens(); // 토큰 갱신을 시도합니다.
          isRefreshing = false;
          onRrefreshed(newToken);
          refreshSubscribers = [];
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      // 새로운 토큰이 갱신될 때까지 요청을 대기합니다.
      return new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          resolve(axios(originalRequest)); // 원래의 요청을 재시도합니다.
        });
      });
    }

    return Promise.reject(err.response.data);
  },
);

export const Api = {
  User: UserService,
};
