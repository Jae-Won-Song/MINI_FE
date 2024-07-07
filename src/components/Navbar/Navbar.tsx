'use client';

import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { BsFillPersonFill } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { CiHeart } from 'react-icons/ci';
import Link from 'next/link';
import { useAuth } from 'src/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Api } from 'src/api';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [hideNavCat, setHideNavCat] = useState(false);
  const router = useRouter();

  const [name, setName] = useState<string>('');

  const fetchUserInfo = async () => {
    const data = await Api.User.profile();
    setName(data.name);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location; // 객체 구조 분해 사용
      setHideNavCat(
        () => pathname === '/auth/login' || pathname === '/auth/register',
      );
    }
  }, [router]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <header>
      <div className="navbar">
        <div className="title">
          <Link href="/">
            <h1>여기 죽이지?</h1>
          </Link>
        </div>
        {!hideNavCat && (
          <div className="nav-cat">
            {isLoggedIn && (
              <>
                <p className="user-email">
                  <span>{name}</span> 님, 안녕하세요!
                </p>
                <p>&nbsp;|&nbsp;</p>
              </>
            )}
            <Link href="/mypage">
              <button className="icon-button" aria-label="My Page">
                <BsFillPersonFill />
              </button>
            </Link>
            <Link href="/myreservation">
              <button className="icon-button" aria-label="My Reservation">
                <HiOutlineShoppingBag />
              </button>
            </Link>
            <Link href="/wishlist">
              <button className="icon-button" aria-label="Wishlist">
                <CiHeart />
              </button>
            </Link>
            <p>&nbsp;|&nbsp;</p>
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="icon-button"
                style={{ cursor: 'pointer' }}
                aria-label="Logout"
              >
                로그아웃
              </button>
            ) : (
              <>
                <Link href="/auth/login">
                  <button className="icon-button" aria-label="Login">
                    로그인
                  </button>
                </Link>
                <div>/</div>
                <Link href="/auth/register">
                  <button className="icon-button" aria-label="Register">
                    회원가입
                  </button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
