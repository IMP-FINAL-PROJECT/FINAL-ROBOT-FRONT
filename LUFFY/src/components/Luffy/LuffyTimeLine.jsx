import { useQuery } from "@tanstack/react-query";
import useCounselStore from "../../stores/useCounselStore";
import { fetchExpTimeLine } from "../../services/luffyService";
import Luffy_Call_Icon from "../../assets/Icon/Luffy_Call.svg?react";

/**
 * LuffyTimeLine 컴포넌트는 상담 ID에 따라 경험치 타임라인을 표시합니다.
 * 
 * @component
 */
export default function LuffyTimeLine() {
  // 상담 ID를 가져옵니다.
  const { counselId } = useCounselStore();

  // 경험치 타임라인 데이터를 가져옵니다.
  const { data, isLoading } = useQuery({
    queryKey: ["expTimeline", counselId],
    queryFn: () => fetchExpTimeLine(counselId),
    refetchOnWindowFocus: false,
  });

  // 데이터가 로딩 중일 때 로딩 메시지를 표시합니다.
  if (isLoading) {
    return <div>로딩중입니다</div>;
  } else {
    // 데이터의 키를 가져와서 타임라인을 생성합니다.
    const keys = Object.keys(data);
    const timeline = [];

    keys.forEach((key) => {
      const date = (
        <li key={key}>
          <div className="timeline-vertical">
            <div className="w-[1vw] h-[1vw] timeline-middle">
              <Luffy_Call_Icon style={{ width: 80, height: 80 }} />
            </div>
          </div>
          <div className="mb-10 timeline-end">
            <div className="text-[1vw] text-text-black mb-[0.5vw] mt-[0.4vw] font-bold">
              {key}
            </div>
            {data[key].map((item) => (
              <div
                key={item.id}
                className="text-[1vw] mt-[1.5vw] text-text-gray"
              >
                {item.content} +{item.exp}
              </div>
            ))}
          </div>
        </li>
      );
      timeline.push(date);
    });

    // 타임라인을 반환합니다.
    return (
      <>
        {timeline.length > 0 ? (
          timeline
        ) : (
          <div>상담받고 러피를 키워요!</div>
        )}
      </>
    );
  }
}
