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
      yearMonth: `${day}`,
      dayWithWeekday: `${dayOfWeek}요일`
    };
  };

  const date = getFormattedDate();

  return (

      <div className="w-[15vw] h-[15vw] rounded-[50px] shadow-lg text-center leading-10 bg-white">
        <p className="text-[2.3vw] text-black mt-[1.4vw]">{date.dayWithWeekday}</p>
        <p className="mt-[3.6vw] text-black text-[7.5vw]">{date.yearMonth} </p>
      </div>
  );
}
