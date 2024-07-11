import Service from 'src/service';
import { apiWithNoToken, apiWithToken } from '.';
import Cookies from 'js-cookie';

export interface ServerResponse {
  status: number;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
}

export interface userData {
  email: string;
  name: string;
  phoneNumber: string;
}
export interface registerRequest extends userData {
  password: string;
}
export interface registerResponse extends userData {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface Service {
  login: (req: LoginRequest) => Promise<ServerResponse>;
  register: (req: registerRequest) => Promise<ServerResponse>;
  logout: () => Promise<ServerResponse>;
  refreshTokens: (req: string) => Promise<ServerResponse>;
  profile: () => Promise<ServerResponse>;
}

const API = '/user';

const UserService = {
  login: async (req: LoginRequest) => {
    try {
      const { data } = await apiWithNoToken.post(`${API}/login`, req);
      const { accessToken, refreshToken } = data;
      Service.LocalStorage.AccessToken.set(accessToken);
      Cookies.set('refresh-token', refreshToken, { expires: 7 }); // 쿠키 만료기간을 7일로 설정
      return accessToken;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  register: async (req: registerRequest) => {
    try {
      const response = await apiWithNoToken.post(`${API}/register`, req);
      const { status, data } = response;

      if (status === 201 || data.userId) {
        return data as registerResponse;
      } else {
        return Promise.reject(new Error(data.message || 'Registration failed'));
      }
    } catch (error) {
      return Promise.reject(error.response?.data || error); // 에러 객체를 그대로 reject에 포함
    }
  },
  // refreshTokens: async () => {
  //   try {
  //     const { data } = await apiWithToken.post(`${API}/refresh-tokens`, {
  //       accessToken: Service.LocalStorage.AccessToken.get(),
  //     });
  //     const { accessToken } = data.data;
  //     Service.LocalStorage.AccessToken.set(accessToken);
  //     return accessToken;
  //   } catch (error) {
  //     console.error(error);
  //     return Promise.reject(error);
  //   }
  // },
  refreshTokens: async () => {
    try {
      const refreshToken = Cookies.get('refresh-token');
      if (!refreshToken) throw new Error('No refresh token available');
      const { data } = await apiWithNoToken.post(
        `${API}/refresh-tokens`,
        {},
        {
          headers: {
            'Refresh-Token': refreshToken,
          },
        },
      );
      const { accessToken } = data.data;
      Service.LocalStorage.AccessToken.set(accessToken);
      return accessToken;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
  logout: async () => {
    try {
      const { message } = (await apiWithToken.post(
        `${API}/logout`,
        {},
      )) as ServerResponse;
      Service.LocalStorage.AccessToken.remove();
      return message;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  profile: async () => {
    try {
      const { data } = (await apiWithToken.get(`${API}`)) as ServerResponse;
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default UserService;
