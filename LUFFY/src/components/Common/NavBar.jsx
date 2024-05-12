import MainLogo from "../../assets/MainLogo.svg";
import Luffy_Call_Icon from "../../assets/Icon/Luffy_Call.svg?react";
import Diary_Icon from "../../assets/Icon/Diary.svg?react";
import Luffy_Icon from "../../assets/Icon/Luffy.svg?react";
import Quotes_Icon from "../../assets/Icon/Quotes.svg?react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const navbarcss =
    "flex justify-start gap-8 mx-[2.4rem] text-text- hover:text-cherry hover:fill-cherry fill-text-glay flex items-center gap-4";
  const navbarcssActive =
    "flex justify-start gap-8 mx-[2.4rem] text-cherry fill-cherry flex items-center gap-4";
  return (
    <div className="col-span-2 h-screen bg-beige relative">
      <Link to="/">
        <div className="mb-0">
          <img src={MainLogo} alt="MainLogo" />
        </div>
      </Link>
      <div
        className="grid gird-rows-6 gap-[3vw] mt-[192px] bg-beige"
        id="네브바메인"
      >
        <NavLink
          to="luffycall"
          className={({ isActive }) => (isActive ? navbarcssActive : navbarcss) } 
        >
          <Luffy_Call_Icon style={{width:80 ,height:80}}/>
          <p
            className="
                text-[1.7rem]
                font-bold"
          >
            러피콜
          </p>
        </NavLink>
        <NavLink
          to="diary"
          className={({ isActive }) => (isActive ? navbarcssActive : navbarcss)}
        >
          <Diary_Icon style={{width:80 ,height:80}}/>
          <p
            className="
                text-[1.75rem]
                font-bold"
          >
            상담기록
          </p>
        </NavLink>
        <NavLink
          to="luffy"
          className={({ isActive }) => (isActive ? navbarcssActive : navbarcss)}
        >
          <Luffy_Icon style={{width:80 ,height:80}} />
          <p
            className="
                text-[1.75rem]
                font-bold"
          >
            러피
          </p>
        </NavLink>
        <NavLink
          to="today"
          className={({ isActive }) => (isActive ? navbarcssActive : navbarcss)}
        >
          <Quotes_Icon style={{width:80 ,height:80}} />
          <p
            className="
                text-[1.75rem]
                font-bold"
          >
            오늘의명언
          </p>
        </NavLink>
       
      </div>
    </div>
  );
}
