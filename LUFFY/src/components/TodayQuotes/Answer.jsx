import { useState } from "react";

/**
 * 답변 컴포넌트
 * @param {Object} props - 컴포넌트의 속성
 * @param {Array} props.answer - 답변 배열
 * @returns {JSX.Element}
 */
export default function Answer({ answer }) {
  const [selectName, setSelectName] = useState(answer[0]?.nickname);

  /**
   * 닉네임 선택 핸들러
   * @param {string} name - 선택된 닉네임
   */
  const handleSelectName = (name) => {
    setSelectName(name);
  };

  return (
    <>
      <div className="col-span-10 h-[20vw] flex flex-col items-center">
        <div className="flex flex-row justify-center">
          <button
            onClick={() => handleSelectName(answer[0]?.nickname)}
            className={
              "m-[1vw] text-[1.2vw] font-bold " +
              (selectName === answer[0]?.nickname
                ? "text-cherry"
                : "text-text-black hover:text-[#888888]")
            }
          >
            {answer[0]?.nickname}
          </button>
          <button
            onClick={() => handleSelectName(answer[1]?.nickname)}
            className={
              "m-[1vw] text-[1.2vw] font-bold " +
              (selectName === answer[1]?.nickname
                ? "text-cherry"
                : "text-text-black hover:text-[#888888]")
            }
          >
            {answer[1]?.nickname}
          </button>
        </div>
        <div className="w-[28vw]">
          {selectName === answer[0]?.nickname ? (
            <video
              preload="metadata"
              playsInline
              controls
              onClick={(event) => {
                event.preventDefault();
                if (event.target.paused === false) {
                  event.target.pause();
                } else {
                  event.target.play();
                }
              }}
              className="w-full h-[16vw] rounded-lg object-cover"
              src={answer[0]?.filepath}
            ></video>
          ) : (
            <video
              preload="metadata"
              playsInline
              controls
              onClick={(event) => {
                event.preventDefault();
                if (event.target.paused === false) {
                  event.target.pause();
                } else {
                  event.target.play();
                }
              }}
              className="w-full h-[16vw] rounded-lg object-cover"
              src={answer[1]?.filepath}
            ></video>
          )}
        </div>
      </div>
    </>
  );
}
