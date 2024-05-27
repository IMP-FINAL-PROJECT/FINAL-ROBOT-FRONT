import dayjs from "dayjs";
import TodayRecoding from "../../components/TodayQuotes/TodayRecoding";
import ModalRoute from "../../components/Modal/ModalRoute";
import NextIcon from "../../assets/NextIcon.svg";
import { useState, useEffect } from "react";
import TodayQuotesBox from "../../components/TodayQuotes/TodayQuotesBox";
import useCounselStore from "../../stores/useCounselStore";
import useUserStore from "../../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { getAnsList } from "../../services/quoteService";

/**
 * TodayQuotesPage 컴포넌트는 오늘의 명언 페이지를 렌더링합니다.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function TodayQuotesPage() {
  const [isquoteServiceBoxOpen, setIsquoteServiceBoxopen] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isRecoding, setIsRecoding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nicknameCount, setNicknameCount] = useState(0);
  const { quote } = useCounselStore();
  const date = dayjs();
  const year = date.get("y");
  const month = date.get("M") + 1;
  const day = date.get("D");
  const { counselId } = useCounselStore();
  const { nickname } = useUserStore();
  const { data: ansList, isLoading } = useQuery({
    queryKey: ["ansList", counselId],
    queryFn: () => getAnsList(counselId),
  });

  useEffect(() => {
    if (!isLoading) {
      setLoading(true);
      let count = 0;
      ansList.answerList.forEach(group => {
        group.forEach(answer => {
          if (answer.nickname === nickname) {
            count++;
          }
        });
      });
      setNicknameCount(count);
      setLoading(false);
    }
  }, [isLoading, ansList, nickname]);

  const handleClickIsquoteBoxOpen = () => {
    if (!isAnswered) {
      setIsquoteServiceBoxopen((pre) => !pre);
    } else {
      alert("상대방이 아직 답변을 작성하지 않았어요! 조금 기다릴까요?");
    }
  };

  const handleIsAnswered = () => {
    setIsAnswered(true);
  };

  const handleIsRecording = () => {
    setIsRecoding((pre) => !pre);
  };

  if (isLoading || loading) {
    return <div>로딩 중</div>;
  }

  return (
    <ModalRoute
      modalcss="w-[49.5vw] h-[85vh] bg-pink rounded-[40px]"
      isX={true}
    >
      <p className="text-[1.8vw] ml-[4vw] mt-[2vw] text-text-black">
        {year}년 {month}월 {day}일
      </p>
      <div className="flex flex-col items-center justify-center mx-auto">
        <button
          onClick={handleClickIsquoteBoxOpen}
          disabled={isRecoding}
          className="bg-white h-[3vw] w-[42vw] mt-[0.5vw] rounded-[35px] shadow-md leading-[3vw] grid grid-cols-10"
        >
          <p className="text-[1.3vw] col-span-9 text-text-black hover:text-[#888888]">
            {nicknameCount === ansList.answerList.length ? "기록" : isquoteServiceBoxOpen ? "기록" : "오늘의 명언"}
          </p>
          <div className="col-span-1 h-[2.5vw] my-auto">
            <img className="m-auto w-full h-full" src={NextIcon} alt="Next Icon" />
          </div>
        </button>

        {nicknameCount === ansList.answerList.length ? (
          <TodayQuotesBox
            handleIsAnswered={handleIsAnswered}
            isAnswered={isAnswered}
            ansList={ansList}
            handleClickIsquoteBoxOpen={handleClickIsquoteBoxOpen}
          />
        ) : !isquoteServiceBoxOpen ? (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="w-[80%] mt-[2vw] text-[1.5vw] col-span-9 text-text-black">
              {quote.content}
            </p>
            <TodayRecoding
              handleIsRecording={handleIsRecording}
              handleClickIsquoteBoxOpen={handleClickIsquoteBoxOpen}
              handleIsAnswered={handleIsAnswered}
            />
          </div>
        ) : (
          <TodayQuotesBox
            handleIsAnswered={handleIsAnswered}
            isAnswered={isAnswered}
            ansList={ansList}
            handleClickIsquoteBoxOpen={handleClickIsquoteBoxOpen}
          />
        )}
      </div>
    </ModalRoute>
  );
}
