import {useState} from 'react'
import Video_Slide from "../../components/Main/Video_Slide";
import { Outlet, Link } from "react-router-dom";
import Luffy from "../../components/Main/Luffy";
import TodayQuotes from "../../components/Main/TodayQuotes";
import Diary from "../../components/Main/Diary";
import dayjs from "dayjs";
import useCounselStore from "../../stores/useCounselStore";
import Voice_Memo from "../../components/Main/Voice_Memo";
import { motion } from "framer-motion";
import Time from "../../components/Main/Time"
import Video from "../../assets/Icon/Luffy_Call.svg"

export default function Index() {
  const { anniversary } = useCounselStore();
  const today = dayjs();
  const anni = dayjs(anniversary);
  const rs = today.diff(anni, "day", true);
  const dday = Math.floor(rs) + 1;
  const [Videocolor, setVideocolor] = useState("bg-beige20");
  const [luffycolor, setLuffycolor] = useState("bg-beige20");
  const [diarycolor, setDiarycolor] = useState("bg-skyblue10");
  return (
    <div className="mt-[3.5vw]">
      <div className="flex justify-between">
        <p className="text-text-black">
        <Time />
        </p>
        <Link to="today" id="today">
          <TodayQuotes />
        </Link>
      </div>
      
      <div
        id="LinkCradWrapper"
        className="ml-5 mt-4 h-[17vw] grid grid-cols-9 gap-12"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}            
          onHoverStart={(event, info) => {setLuffycolor("bg-beige10")}} 
          onHoverEnd={(event, info) => {setLuffycolor("bg-beige20")}} 
          className="col-span-4">
          <Link
            to="luffy"
            id="Luffy"
            className={`h-full ${luffycolor} grid grid-cols-5 rounded-[20px] shadow-md`}
          >
            <Luffy dday={dday} />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="col-span-2">
          <Link
            to="luffycall"
            id="LuffyCall"
            className="h-full bg-beige10 flex flex-col items-center justify-around rounded-[20px] shadow-md"
          >
            <p className="text-[1.2vw] mt-[1vw] font-bold text-text-gray">
              <span className="text-cherry">상담</span>을 시작해보세요!
            </p>
            <div className="grow flex justify-center items-center w-[60%]">
              <img src={Video} alt="Video" />
            </div>
            <p className="text-[1.2vw] mb-[0.5vw] text-text-black">러피콜 시작하기</p>
          </Link>
        </motion.div>
        <motion.div 
        whileHover={{ scale: 1.1 }} 
        onHoverStart={(event, info) => {setDiarycolor("bg-skyblue")}} 
        onHoverEnd={(event, info) => {setDiarycolor("bg-skyblue10")}} 
        className="col-span-2">
          <Link
            to="diary"
            id="Diary"
            className={`h-full ${diarycolor} flex flex-col items-center rounded-[20px] shadow-md`}
          >
            <Diary />
          </Link>
        </motion.div>
       
        <motion.div 
          whileHover={{ scale: 1.05 }}
          onHoverStart={(event, info) => {setVideocolor("bg-beige10")}} 
          onHoverEnd={(event, info) => {setVideocolor("bg-beige20")}} 
        
            className={`h-full ${Videocolor} rounded-[20px] shadow-md col-span-5 justify-center items-center`}>
          <Video_Slide />
        </motion.div>

       
        
        
        <div id="Memo" className="col-span-2">
          <Voice_Memo />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
