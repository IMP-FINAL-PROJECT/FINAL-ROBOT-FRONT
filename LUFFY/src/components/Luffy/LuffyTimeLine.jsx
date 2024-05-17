import { useQuery } from "@tanstack/react-query";
import useCounselStore from "../../stores/useCounselStore";
import { fetchExpTimeLine } from "../../services/luffyService";
import Luffy_Call_Icon from "../../assets/Icon/Luffy_Call.svg?react";

export default function LuffyTimeLine() {
  const { counselId } = useCounselStore();
  const { data, isLoading } = useQuery({
    queryKey: ["expTimeline", counselId],
    queryFn: () => fetchExpTimeLine(counselId),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>로딩중입니다</div>;
  } else {
    const keys = Object.keys(data);
    const timeline = [];
    console.log(data)
    keys.forEach((key, idx) => {
      const date = (
        <li key={key}>
          <div className="timeline-vertical ">
            <div className="w-[1vw] h-[1vw] timeline-middle">
            <Luffy_Call_Icon style={{ width: 80, height: 80 }}/>
            </div>
          </div>
          <div
            className={
              "mb-10 timeline-end "
            }
          >
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
