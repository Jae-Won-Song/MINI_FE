import Service from 'src/service';
import { apiWithNoToken, apiWithToken } from '.';

export interface ServerResponse {
  status: number;
  message?: string;
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
      console.log('Login Request:', req);
      const { data } = await apiWithNoToken.post(`${API}/login`, req);
      // console.log('Login Response Headers:', data.headers);
      const { accessToken } = data;
      Service.LocalStorage.AccessToken.set(accessToken);
      return accessToken;
    } catch (error) {
      console.error('Login Error:', error);
      return Promise.reject(error);
    }
  },
  register: async (req: registerRequest) => {
    try {
      console.log('Register Request:', req);
      const response = await apiWithNoToken.post(`${API}/register`, req);
      const { status, data } = response;

      if (status === 201 || data.userId) {
        return data as registerResponse;
      } else {
        return Promise.reject(new Error(data.message || 'Registration failed'));
      }
    } catch (error) {
      console.error('Register Error:', error);
      return Promise.reject(error.response?.data || error);
    }
  },
  // refreshTokens: async () => {
  //   try {
  //     const { data } = await apiWithNoToken.post(`${API}/refresh-tokens`, {
  //       accessToken: Service.LocalStorage.AccessToken.get(),
  //     });
  //     // eslint-disable-next-line no-useless-rename
  //     const { accessToken: accessToken } = data.data;
  //     Service.LocalStorage.AccessToken.set(accessToken);
  //     return accessToken;
  //   } catch (error) {
  //     console.error(error);
  //     return Promise.reject(error);
  //   }
  // },
  refreshTokens: async () => {
    try {
      const accessToken = Service.LocalStorage.AccessToken.get();
      console.log('액세스 토큰', accessToken);
      if (!accessToken) throw new Error('액세스 토큰이 없습니다.');

      const { data } = await apiWithNoToken.post(
        `${API}/refresh-tokens`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      const { accessToken: newAccessToken } = data.data;
      console.log('새로운 액세스 토큰:', newAccessToken);
      Service.LocalStorage.AccessToken.set(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
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
      console.error('Logout Error:', error);
      return Promise.reject(error);
    }
  },
  profile: async () => {
    try {
      const { data } = (await apiWithToken.get(`${API}`)) as ServerResponse;
      console.log('Profile Data:', data);
      return data;
    } catch (error) {
      console.error('Profile Error:', error);
      return Promise.reject(error);
    }
  },
};

export default UserService;
