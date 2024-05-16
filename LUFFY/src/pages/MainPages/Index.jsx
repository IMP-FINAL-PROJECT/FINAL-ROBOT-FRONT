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
import VideoIcon from "../../assets/Icon/VideoIcon.png"
import meeting from "../../assets/Icon/meeting.png"


export default function Index() {
  const { startdate } = useCounselStore();
  const today = dayjs();
  const anni = dayjs(startdate);
  const rs = today.diff(anni, "day", true);
  const dday = Math.floor(rs) + 1;
  const [Videocolor, setVideocolor] = useState("bg-beige20");
  const [luffycolor, setLuffycolor] = useState("bg-beige20");
  const [diarycolor, setDiarycolor] = useState("bg-skyblue10");
  return (
    <div className="mt-[2vw] ">
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
        className="ml-2 mt-4 h-[17vw] grid grid-cols-9 gap-12"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}            
          onHoverStart={(event, info) => {setLuffycolor("bg-beige10")}} 
          onHoverEnd={(event, info) => {setLuffycolor("bg-beige20")}} 
          className="col-span-2">
          <Link
            to="luffy"
            id="Luffy"
            className={`h-full w-full flex flex-col items-center justify-around `}
          >
            <Luffy dday={dday} />
            <p className="text-[1.5vw] mt-[0.3vw] text-black font-bold">러피 키우기</p>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="col-span-2">
          <Link
            to="luffycall"
            id="LuffyCall"
            className="h-full flex flex-col items-center justify-around "
          >
            <div className="grow flex justify-center items-center ">
              <img src={meeting} alt="Video" className='rounded-[50px] shadow-md w-[15vw] h-[15vw]' />
            </div>
            <p className="text-[1.5vw] mt-[0.3vw] text-black font-bold">러피콜</p>
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
            className="h-full w-full flex flex-col items-center justify-around "      
          >
            <Diary />
            <p className="text-[1.5vw] mt-[0.3vw] text-black font-bold">상담 캘린더</p>
          </Link>
        </motion.div>
        <motion.div
					
					whileHover={{ scale: 1.1 }}
          className="col-span-2 h-full flex flex-col items-center justify-around "
				>
          <Voice_Memo />
          <p className="text-[1.45vw] mt-[0.3vw] text-black font-bold">음성 메모</p>
          </motion.div>
          <motion.div 
          whileHover={{ scale: 1.05 }}            
          onHoverStart={(event, info) => {setLuffycolor("bg-beige10")}} 
          onHoverEnd={(event, info) => {setLuffycolor("bg-beige20")}} 
          className="col-span-2">
          <Link
            to="luffy"
            id="Luffy"
            className={`h-full w-full flex flex-col items-center justify-around `}
          >
            <Luffy dday={dday} />
            <p className="text-[1.5vw] mt-[0.3vw] text-black font-bold">내 정보</p>
          </Link>
        </motion.div>
       
        <motion.div 
          whileHover={{ scale: 1.05 }}
          onHoverStart={(event, info) => {setVideocolor("bg-beige10")}} 
          onHoverEnd={(event, info) => {setVideocolor("bg-beige20")}} 
        
            className={`h-full rounded-[20px] shadow-md col-span-4 justify-center items-center`}>
          <Video_Slide />
        </motion.div>

       
        
        
      

      </div>
      <Outlet />
    </div>
  );
}
