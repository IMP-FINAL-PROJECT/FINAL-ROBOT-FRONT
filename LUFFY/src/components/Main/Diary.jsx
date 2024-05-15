import DiaryImg from "../../assets/Icon/Diary.svg";

export default function Diary() {
  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;  // JavaScript의 월은 0부터 시작합니다.
    const day = date.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = dayNames[date.getDay()];  // getDay()는 요일을 숫자로 반환합니다.

    return {
      yearMonth: `${year}년 ${month}월`,
      dayWithWeekday: `${day} (${dayOfWeek})`
    };
  };

  const date = getFormattedDate();

  return (
    <div>
      <div className="mt-10 text-center">
        <p className="text-[1.4vw] text-text-gray mb-[0.5vw]">{date.yearMonth}</p>
        <p className="mt-10 text-[4vw] text-text-black">{date.dayWithWeekday}</p>
      </div>
      <div className="flex items-center justify-center mt-[1vw]">
        <img src={DiaryImg} alt="DiaryImg" style={{ width: '3vw', height: '3vw', marginRight: '1vw' }}/>
        <p className="text-[1.2vw] text-text-black">상담 캘린더</p>
      </div>
    </div>
  );
}
