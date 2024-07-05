'use client';

import React, { useEffect } from 'react';
import './Navbar.scss';
import { BsFillPersonFill } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { CiHeart } from 'react-icons/ci';
import Link from 'next/link';
import { useAuth } from 'src/contexts/AuthContext';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header>
      <div className="navbar">
        <div className="title">
          <Link href="/">
            <h1>여기 죽이지</h1>
          </Link>
        </div>
        <div className="nav-cat">
          <Link href="/mypage">
            <li>
              <BsFillPersonFill />
            </li>
          </Link>
          <Link href="/myreservation">
            <li>
              <HiOutlineShoppingBag />
            </li>
          </Link>
          <Link href="/wishlist">
            <li>
              <CiHeart />
            </li>
          </Link>
          {isLoggedIn ? (
            <li onClick={logout} style={{ cursor: 'pointer' }}>
              로그아웃
            </li>
          ) : (
            <>
              <Link href="/auth/login">
                <li>로그인</li>
              </Link>
              <div>/</div>
              <Link href="/auth/register">
                <li>회원가입</li>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
