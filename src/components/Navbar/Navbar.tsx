import React from 'react';
import './Navbar.scss';
import { BsFillPersonFill } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { CiHeart } from 'react-icons/ci';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header>
      <div className="navbar">
        <div className="title">
          <Link href="/">
            <h1>여기 죽이지?</h1>
          </Link>
        </div>
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
          <Link href="auth/login">
            <li>로그인</li>
          </Link>
          <div>/</div>
          <Link href="auth/register">
            <li>회원가입</li>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
