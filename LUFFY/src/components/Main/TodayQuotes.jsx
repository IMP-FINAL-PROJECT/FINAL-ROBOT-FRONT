import { useState } from "react";
import { motion } from "framer-motion";
import MainBookmarkIcon from "../../assets/Icon/Quotes.svg";
import useCounselStore from "../../stores/useCounselStore";

export default function TodayQuotes() {
  const { quote } = useCounselStore();
  const [color, setColor] = useState("bg-beige20");
  const boxVariants = {
    hover: {
      scale: 1.1,
    },
  };
  return (
    <>
      <motion.div
        whileHover="hover"
        variants={boxVariants}
        className="flex relative ml-[5vw] w-[40vw] h-[7vw]"
        onHoverStart={(event, info) => {setColor("bg-beige10")}}
        onHoverEnd={(event, info) => {setColor("bg-beige20")}}
      >
        <div className={`${color} w-[36vw] h-[5vw] rounded-[20px] flex items-center`}>
          <p className="text-[1.2vw] font-bold text-text-gray ml-[1vw]">
            오늘의 명언
          </p>
          <p className="text-[1vw] text-text-black ml-[1vw] w-[23vw]">
            {quote?.content}
          </p>
        </div>
        <div className="absolute left-[80%] -top-[20%]">
          <img src={MainBookmarkIcon} alt="" />
        </div>
      </motion.div>
    </>
  );
}
