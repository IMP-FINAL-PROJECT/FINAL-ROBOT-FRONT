import useUserStore from "../../stores/useUserStore";
import useCounselStore from "../../stores/useCounselStore";
import myinfo from "../../assets/Icon/myinfo.png";
import DropdownIcon from "../../assets/DropdownIcon.svg";
import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ModifyModal from "../../components/Modal/ModifyModal";
import ModalRoute from "../../components/Modal/ModalRoute";

/**
 * UserInfo 컴포넌트는 사용자 정보를 표시하고 수정할 수 있는 모달을 렌더링합니다.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function UserInfo() {
  const { startdate, userInfos, reset: counselReset } = useCounselStore();
  const {
    userId,
    moodId,
    nickname,
    email,
    birthday,
    reset: userReset,
  } = useUserStore();
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

  return (
    <ModalRoute modalcss="w-[30.5vw] h-[50vh] bg-pink rounded-[40px]" isX={true}>
      <div className="my-[48px] text-text-black flex flex-col ml-[15px] text-[80%]">
        <p className="mb-[8px] text-[2vw] font-bold text-black">마이 페이지</p>
        <p className="mb-[8px] text-[1vw]">내 이름 : {nickname}</p>
        <p className="mb-[8px] text-[1vw]">내 생일 : {myBirth}</p>
        <p className="mb-[8px] text-[1vw]">내 이메일 : {email}</p>
        <p className="mb-[8px] text-[1vw]">최초 가입일 : {anni}</p>
        <p className="mb-[8px] text-[1vw]">상담사 : {cherryInfo.nickname}</p>
      </div>
      <div className="flex justify-around text-text-black">
        <button onClick={() => setOpenModifyModal(true)}>내정보</button>
        <button onClick={logout}>로그아웃</button>
      </div>
      <AnimatePresence>
        {openModifyModal && (
          <ModifyModal onClose={CloseModifyModal}></ModifyModal>
        )}
      </AnimatePresence>
    </ModalRoute>
  );
}
