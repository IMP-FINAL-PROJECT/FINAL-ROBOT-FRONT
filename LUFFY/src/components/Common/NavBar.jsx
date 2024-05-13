import React from 'react';
import MainLogo from "../../assets/MainLogo.svg";
import Luffy_Call_Icon from "../../assets/Icon/Luffy_Call.svg?react";
import Diary_Icon from "../../assets/Icon/Diary.svg?react";
import Luffy_Icon from "../../assets/Icon/Luffy.svg?react";
import Quotes_Icon from "../../assets/Icon/Quotes.svg?react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  // 기본 네비게이션 바 CSS
  const baseNavbarCss = "flex justify-start gap-8 mx-[2.4rem] flex items-center gap-4";

  // 활성화된 링크의 CSS
  const activeNavbarCss = `${baseNavbarCss} text-lightpurple fill-lightpurple`;

  // 비활성화된 링크의 CSS
  const inactiveNavbarCss = `${baseNavbarCss} hover:text-lightpurple hover:fill-lightpurple fill-text-gray`;

  // 네비게이션 텍스트 스타일
  const navTextCss = "text-[1.75rem] font-bold";
  
  // 오늘의명언 텍스트 크기
  const quoteTextCss = "text-[1.70rem] font-bold";

  return (
    <div className="col-span-2 h-screen bg-beige relative">
      <Link to="/">
        <img src={MainLogo} alt="Main logo" className="mb-0" />
      </Link>
      <div className="grid grid-rows-6 gap-[1.5vw] mt-[192px] bg-beige" id="navbar-main">
        {/* 각 NavLink 컴포넌트를 랜더링합니다. isActive prop을 통해 스타일을 조정합니다. */}
        <NavLink
          to="luffycall"
          className={({ isActive }) => (isActive ? activeNavbarCss : inactiveNavbarCss)}
        >
          <Luffy_Call_Icon style={{ width: 80, height: 80 }}/>
          <p className={navTextCss}>러피콜</p>
        </NavLink>
        <NavLink
          to="diary"
          className={({ isActive }) => (isActive ? activeNavbarCss : inactiveNavbarCss)}
        >
          <Diary_Icon style={{ width: 80, height: 80 }}/>
          <p className={navTextCss}>상담기록</p>
        </NavLink>
        <NavLink
          to="luffy"
          className={({ isActive }) => (isActive ? activeNavbarCss : inactiveNavbarCss)}
        >
          <Luffy_Icon style={{ width: 80, height: 80 }}/>
          <p className={navTextCss}>러피</p>
        </NavLink>
        <NavLink
          to="today"
          className={({ isActive }) => (isActive ? activeNavbarCss : inactiveNavbarCss)}
        >
          <Quotes_Icon style={{ width: 80, height: 80 }}/>
          <p className={quoteTextCss}>오늘의명언</p>
        </NavLink>
      </div>
    </div>
  );
}
