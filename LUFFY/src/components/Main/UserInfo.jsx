import useUserStore from "../../stores/useUserStore";
import useCounselStore from "../../stores/useCounselStore";
import myinfo from "../../assets/Icon/myinfo.png";
import DropdownIcon from "../../assets/DropdownIcon.svg";
import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ModifyModal from "../Modal/ModifyModal";

export default function UserInfo() {
  const { startdate, userInfos, reset: counselReset } = useCounselStore();
  const { userId, reset: userReset } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const navigate = useNavigate();

  let cherryInfo = userInfos.filter((info) => {
    return info.id !== userId;
  })[0];

  let myInfo = userInfos.filter((info) => {
    return info.id === userId;
  })[0];

  const anni = dayjs(startdate).format("YYYY년 M월 D일");
  const myBirth = myInfo.birthday;
  const cherryBirth = cherryInfo.birthday;

  const handleClickIsOpen = () => {
    setIsOpen((pre) => !pre);
  };

  const CloseModifyModal = () => {
    setOpenModifyModal(false);
  };

  function logout() {
   counselReset();
    userReset();
    localStorage.removeItem("user-store");
    localStorage.removeItem("couple-store");

    window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${
      import.meta.env.VITE_APP_KAKAO_REST_API_KEY
    }&logout_redirect_uri=${location.protocol + "//" + location.host}`;
  }

  let userInfoClassName = ` w-[15vw] h-[15vw] rounded-[50px]  text-[1.5rem] shadow-md text-center `;

  return (
    <>
      <div id="userInfo" className={userInfoClassName}>

          <img className="rounded-[50px] shadow-md w-[15vw] h-[15vw]" src={myinfo} alt="myinfo" />


        </div>




    </>
  );
}
