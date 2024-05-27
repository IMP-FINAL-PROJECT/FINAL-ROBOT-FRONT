import useUserStore from "../../stores/useUserStore";
import Question from "./Question";

/**
 * 오늘의 명언 박스 컴포넌트
 * @param {function} handleClickIsquoteBoxOpen - 명언 박스 열기 핸들러
 * @param {Array} ansList - 답변 리스트
 * @param {function} handleIsAnswered - 답변 완료 상태 핸들러
 * @returns {JSX.Element}
 */
export default function TodayQuotesBox({
  handleClickIsquoteBoxOpen,
  ansList,
  handleIsAnswered,
}) {
  const { moodId, nickname } = useUserStore();

  const questionList = ansList.answerList.map((answer, idx) => {
    if (idx === 0) {
      if (ansList.answercnt === 0) {
        return (
          <Question
            handleIsAnswered={handleIsAnswered}
            key={answer[0].content}
            answer={answer}
            reply={0}
            handleClickIsquoteBoxOpen={handleClickIsquoteBoxOpen}
          />
        );
      } else if (ansList.answercnt === 1) {
        if (answer[0]?.mood_id === moodId) {
          return (
            <Question
              handleIsAnswered={handleIsAnswered}
              key={answer[0].content}
              answer={answer}
              reply={1}
              handleClickIsquoteBoxOpen={handleClickIsquoteBoxOpen}
            />
          );
        } else {
          return (
            <Question
              handleIsAnswered={handleIsAnswered}
              key={answer[0].content}
              answer={answer}
              reply={0}
              handleClickIsquoteBoxOpen={handleClickIsquoteBoxOpen}
            />
          );
        }
      } else {
        return (
          <Question
            key={answer[0].content}
            handleIsAnswered={handleIsAnswered}
            answer={answer}
            reply={2}
            handleClickIsquoteBoxOpen={handleClickIsquoteBoxOpen}
          />
        );
      }
    } else {
      return (
        <Question
          key={answer[0].content}
          handleIsAnswered={handleIsAnswered}
          answer={answer}
          reply={2}
          handleClickIsquoteBoxOpen={handleClickIsquoteBoxOpen}
        />
      );
    }
  });

  return (
    <div
      id="TodayQuotesBox"
      className="mt-[1vw] h-[29vw] rounded-[20px] overflow-y-auto"
    >
      {questionList}
    </div>
  );
}
