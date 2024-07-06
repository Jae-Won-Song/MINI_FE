'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isLoggedIn: boolean;
  accessToken: string | null;
  userId: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
}

interface DecodedToken {
  exp: number;
  userId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleErrorResponse = useCallback((error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message;
      if (error.response.status === 400) {
        if (errorMessage.includes('해당 이메일을 가진 유저가 없습니다')) {
          alert('이메일 주소가 잘못되었습니다. 다시 확인해주세요.');
        } else if (
          errorMessage.includes('로그인 기한 만료. 다시 로그인해 주세요.')
        ) {
          alert('비밀번호가 잘못되었습니다. 다시 확인해주세요.');
        } else {
          alert(`로그인 실패: ${errorMessage}`);
        }
      } else {
        alert('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } else {
      alert('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
    return Promise.reject(error);
  }, []);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('이미 로그아웃 상태입니다.');
        return;
      }

      await axios.post(
        `${API_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAccessToken(null);
      setIsLoggedIn(false);
      setUserId(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('로그아웃 되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      await handleErrorResponse(error);
    }
  }, [router, API_URL, handleErrorResponse]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);
      const decoded = jwtDecode<DecodedToken>(token);
      setUserId(decoded.userId);
      console.log('디코드 액세스 토큰:', decoded);
    }
  }, []);

  // Axios 요청 인터셉터 설정
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const newConfig = { ...config }; // config 객체 복제
          newConfig.headers.Authorization = `Bearer ${token}`;
          return newConfig;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Axios 응답 인터셉터 설정
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest.isRetry) {
          originalRequest.isRetry = true; // isRetry 플래그 사용
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await axios.post(`${API_BASE_URL}/user/login`, {
                refreshToken,
              });
              if (response.status === 200 && response.data) {
                const { accessToken, refreshToken: newRefreshToken } =
                  response.data.data;

                setAccessToken(accessToken);
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                const decoded = jwtDecode<DecodedToken>(accessToken);
                setUserId(decoded.userId);
                console.log('디코드 액세스 토큰:', decoded);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return await axios(originalRequest); // await 추가
              }
            }
          } catch (err) {
            console.error('Token refresh failed:', err);
            if (axios.isAxiosError(err) && err.response) {
              alert('토큰 갱신에 실패했습니다. 다시 로그인해 주세요.');
              await logout();
            }
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [API_BASE_URL, logout]);

  const refreshTokens = useCallback(
    async (refreshToken: string) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/user/login`, {
          refreshToken,
        });
        if (response.status === 200 && response.data) {
          const { accessToken, refreshToken: newRefreshToken } =
            response.data.data;

          setAccessToken(accessToken);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          const decoded = jwtDecode<DecodedToken>(accessToken);
          setUserId(decoded.userId);
          console.log('디코드 액세스 토큰:', decoded);
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        if (axios.isAxiosError(error) && error.response) {
          alert('토큰 갱신에 실패했습니다. 다시 로그인해 주세요.');
          await logout();
        }
      }
    },
    [API_BASE_URL, logout],
  );

  useEffect(() => {
    const interval = setInterval(
      () => {
        const token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (token && refreshToken) {
          const decoded: DecodedToken = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            refreshTokens(refreshToken);
          }
        }
      },
      1000 * 60 * 25,
    ); // 25분마다 토큰 유효한지 여부 확인

    return () => clearInterval(interval);
  }, [refreshTokens]);

  const login = async (data: LoginData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, data);
      if (response.status === 200 && response.data) {
        const { accessToken, refreshToken } = response.data.data;
        setAccessToken(accessToken);
        setIsLoggedIn(true);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        const decoded = jwtDecode<DecodedToken>(accessToken);
        setUserId(decoded.userId);
        console.log('디코드 액세스 토큰:', decoded);
        console.log(
          '디코드 리프레시 토큰:',
          jwtDecode<DecodedToken>(refreshToken),
        );
        alert('로그인 성공! 메인 페이지로 이동합니다.');
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      await handleErrorResponse(error);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/register`, data);
      if (response.status === 201) {
        alert('회원가입 완료! 이제 로그인해 주세요.');
        router.push(`/auth/login`);
      } else {
        console.error('회원가입 실패:', response.data.message);
        throw new Error(response.data.message || '회원가입 실패!');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      await handleErrorResponse(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, accessToken, userId, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
