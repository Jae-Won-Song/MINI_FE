'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  accessToken: string | null;
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, data);
      if (response.status === 200 && response.data) {
        const { accessToken, refreshToken } = response.data.data;
        setAccessToken(accessToken);
        setIsLoggedIn(true);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        alert('로그인 성공! 메인 페이지로 이동합니다.');
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.data.message;
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
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.data.message;
        if (
          error.response.status === 400 &&
          errorMessage.includes('이미 가입되어 있습니다')
        ) {
          alert('이미 가입되어 있습니다. 로그인 페이지로 이동합니다.');
          router.push('/auth/login');
        } else {
          alert(`회원가입 실패: ${errorMessage}`);
        }
      } else {
        alert('회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      // const refreshToken = localStorage.getItem('refreshToken');
      if (!token) {
        alert('이미 로그아웃 상태입니다.');
        return;
      }

      // await axios.post(`https://yusuengdo.ddns.net/api/user/logout`, {}, {
      //   headers: {
      //     Authorization: `${token}`
      //   },
      // });

      // setAccessToken(null);
      // setIsLoggedIn(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('로그아웃 되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.data?.message || error.response.data?.message;
        if (error.response.status === 404) {
          alert('해당하는 유저는 없습니다.');
        } else if (
          error.response.status === 400 &&
          errorMessage.includes('이미 로그아웃이 되어 있습니다')
        ) {
          alert('이미 로그아웃 상태입니다.');
        } else {
          alert('로그아웃 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      } else {
        alert('로그아웃 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, accessToken, login, register, logout }}
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
