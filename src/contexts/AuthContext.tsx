'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { Api } from 'src/api';
import Service from 'src/service';

interface AuthContextType {
  isLoggedIn: boolean;
  accessToken: string | null;
  userId: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const token = Service.LocalStorage.AccessToken.get();
    return token !== null;
  });
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      await Api.User.logout();
      setAccessToken(null);
      setIsLoggedIn(false);
      setUserId(null);
      alert('로그아웃 되었습니다.');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  const refreshTokens = useCallback(async () => {
    try {
      const { accessToken } = await Api.User.refreshTokens();
      setAccessToken(accessToken);
      console.log('Token refreshed successfully');
    } catch (error) {
      console.error('Token refresh failed:', error);
      await logout();
    }
  }, [logout]);

  const login = async (data: LoginData) => {
    try {
      await Api.User.login(data);
      setIsLoggedIn(true);
      alert('로그인 성공! 메인 페이지로 이동합니다.');
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await Api.User.register(data);
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      router.push(`/auth/login`);
    } catch (error) {
      console.error('Registration error:', error);

      // 에러 응답 구조에서 메시지를 추출
      const errorMessage =
        error?.resultMessage ||
        '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      const errorStatus = error?.status;

      if (errorStatus === 400) {
        if (errorMessage.includes('중복된 이메일')) {
          alert('이메일이 중복되었습니다. 다른 이메일을 사용해주세요.');
        } else if (errorMessage.includes('중복된 전화번호')) {
          alert('전화번호가 중복되었습니다. 다른 전화번호를 사용해주세요.');
        } else if (
          errorMessage.includes('해당 이메일을 가진 유저가 없습니다')
        ) {
          alert('이메일 주소가 잘못되었습니다. 다시 확인해주세요.');
        } else if (
          errorMessage.includes('로그인 기한 만료. 다시 로그인해 주세요.')
        ) {
          alert('비밀번호가 잘못되었습니다. 다시 확인해주세요.');
        } else {
          alert(`회원가입 실패: ${errorMessage}`);
        }
      } else if (errorStatus === 500) {
        alert('서버 에러! 백엔드에게 문의해봅시다.');
      } else {
        alert('회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        accessToken,
        userId,
        login,
        register,
        logout,
        refreshTokens,
      }}
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
