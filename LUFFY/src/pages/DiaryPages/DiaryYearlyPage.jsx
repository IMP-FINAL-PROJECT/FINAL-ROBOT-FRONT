import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, useAnimate } from "framer-motion";
import dayjs from "dayjs";
import useCounselStore from "../../stores/useCounselStore";
import "./DiaryYearlyPage.css";

const months = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월"
];

/**
 * DiaryYearlyPage 컴포넌트는 연간 다이어리 페이지를 렌더링합니다.
 *
 * @component
 * @returns {JSX.Element}
 */
const DiaryYearlyPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [scope, animate] = useAnimate();
  let year = searchParams.get("year");
  const nowYear = dayjs().year();
  const currentMonth = dayjs().month() + 1; // 현재 월 (1부터 시작)
  const currentDate = dayjs().date(); // 현재 일자
  const { startdate } = useCounselStore();

  /**
   * 연도를 이동하는 함수입니다.
   *
   * @param {number} move - 이동할 연도 (1 또는 -1)
   */
  function moveYear(move) {
    animate("#year", { y: [0, -5, 5, 0] }, { duration: 0.2 });
    year = +year + move;
    searchParams.set("year", year);
    setSearchParams(searchParams, { replace: true });
  }

  /**
   * 선택한 월로 이동하는 함수입니다.
   *
   * @param {number} month - 이동할 월
   */
  function moveToMonth(month) {
    navigate({ pathname: "/diary/month", search: `?year=${year}&month=${month}` });
  }

  /**
   * 각 월의 버튼을 렌더링하는 함수입니다.
   *
   * @param {number} monthIndex - 월의 인덱스 (0부터 시작)
   * @returns {JSX.Element} - 월 버튼
   */
  const renderMonthButton = (monthIndex) => {
    const monthStart = dayjs(`${year}-${monthIndex + 1}-01`);
    const daysInMonth = monthStart.daysInMonth();
    const weeks = [];
    let days = [];

    // 월 시작일 이전의 빈 공간 추가
    for (let i = 0; i < monthStart.day(); i++) {
      days.push(<div key={`empty-${i}`} className="empty-day" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = monthStart.date(day);
      days.push(
        <div key={day} className={`day ${monthIndex + 1 === currentMonth && day === currentDate ? 'today' : ''}`}>
          {currentDay.date()}
        </div>
      );
      if (currentDay.day() === 6 || day === daysInMonth) {
        weeks.push(
          <div key={`week-${currentDay}`} className="week">
            {days}
          </div>
        );
        days = [];
      }
    }

    return (
      <button
        key={monthIndex}
        onClick={() => moveToMonth(monthIndex + 1)}
        className={`month-button ${monthIndex + 1 === currentMonth ? 'current-month' : ''}`}
      >
        <div className="month-header">{months[monthIndex]}</div>
        <div className="calendar-grid">
          {weeks}
        </div>
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center w-full" ref={scope}>
        <div className="year-navigation-container">
          <div className="year-navigation text-[3vw] text-red-400 mb-[2vw] flex items-center">
            <button
              onClick={() => moveYear(-1)}
              disabled={year == dayjs(startdate).year()}
              className={`${year == dayjs(startdate).year() ? "text-gray-400" : ""}`}
            >
              &lt;
            </button>
            <div id="year" className="inline-block text-[3vw]">
              &nbsp;{year}&nbsp;
            </div>
            <button
              onClick={() => moveYear(1)}
              disabled={nowYear + 1 == year}
              className={`${nowYear + 1 == year ? "text-gray-400" : ""}`}
            >
              &gt;
            </button>
          </div>
          <hr className="year-navigation-divider" />
        </div>
        <div className="calendar-container">
          {Array.from({ length: 12 }, (_, i) => renderMonthButton(i))}
        </div>
      </div>
    </div>
  );
};

export default DiaryYearlyPage;
