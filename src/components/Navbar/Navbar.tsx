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
            <h1>여기 죽이지</h1>
          </Link>
        </div>
        <div className="nav-cat">
          <Link href="mypage">
            <li>
              <BsFillPersonFill />
            </li>
          </Link>
          <Link href="myreservation">
            <li>
              <HiOutlineShoppingBag />
            </li>
          </Link>
          <Link href="wishlist">
            <li>
              <CiHeart />
            </li>
          </Link>
          <Link href="login">
            <li>로그인</li>
          </Link>
          <div>/</div>
          <Link href="register">
            <li>회원가입</li>
          </Link>
        </div>
      </div>
    </header>
  );
}
