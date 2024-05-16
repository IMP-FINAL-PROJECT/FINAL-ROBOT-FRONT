import React from 'react';
import MainLogo from "../../assets/MainLogo.svg?react";
import Luffy_Call_Icon from "../../assets/Icon/Luffy_Call.svg?react";
import Diary_Icon from "../../assets/Icon/Diary.svg?react";
import Luffy_Icon from "../../assets/Icon/Luffy.svg?react";
import Quotes_Icon from "../../assets/Icon/Quotes.svg?react";
import { Link } from "react-router-dom";
import "./NavBar.css"

export default function NavBar() {
  const baseNavbarCss = "flex flex-col justify-center items-center gap-1 mx-[2.4rem] tooltip";
  const activeNavbarCss = `${baseNavbarCss} text-lightpurple fill-lightpurple`;
  const inactiveNavbarCss = `${baseNavbarCss} hover:text-lightpurple hover:fill-lightpurple fill-text-gray`;
  const navTextCss = "text-[1vw] font-bold"; // Smaller text size
  const quoteTextCss = "text-[0.95vw] font-bold"; // Slightly smaller text size for the quotes icon

  const navItems = [{
          link: "/",
          icon: MainLogo,
          label: "홈",
          isMainLogo: true
        }, {
          link: "luffycall",
          icon: Luffy_Call_Icon,
          label: "러피콜"
        }, {
          link: "diary",
          icon: Diary_Icon,
          label: "상담기록"
        }, {
          link: "luffy",
          icon: Luffy_Icon,
          label: "러피"
        }, {
          link: "today",
          icon: Quotes_Icon,
          label: "오늘의명언"
        }];

  return (
    <div className="col-span-2 h-screen bg-gradient-to-r from-beige to-beige20 relative shadow">
      <div className="grid grid-rows-6 gap-[0.7vw] mt-[2vw]" id="navbar-main">
        {navItems.map(({ link, icon: Icon, label, isMainLogo }) => (
          <Link
            to={link}
            className={inactiveNavbarCss}
          
            key={link}
          >
            <Icon className="rounded-[20px] shadow-md w-[7vw] h-[7vw]"/>
            <p className={navTextCss}>{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
