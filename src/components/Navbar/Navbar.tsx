'use client';

import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { BsFillPersonFill } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { CiHeart } from 'react-icons/ci';
import Link from 'next/link';
import { useAuth } from 'src/contexts/AuthContext';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [hideNavCat, setHideNavCat] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/auth/login' || pathname === '/auth/register') {
      setHideNavCat(true);
    } else {
      setHideNavCat(false);
    }
  }, [pathname]);

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
