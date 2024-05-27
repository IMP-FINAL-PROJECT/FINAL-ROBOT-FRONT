import { useQuery } from "@tanstack/react-query";
import LuffyLv1 from "../../assets/Luffy/LuffyLv1.png";
import LuffyLv2 from "../../assets/Luffy/LuffyLv2.png";
import LuffyLv3 from "../../assets/Luffy/LuffyLv3.png";
import dayjs from "dayjs";
import useCounselStore from "../../stores/useCounselStore";
import { fetchExpLevel } from "../../services/luffyService";

const Level = ["아기 러피", "학생 러피", "어른 러피"];
const LuffyImage = [LuffyLv1, LuffyLv2, LuffyLv3, LuffyLv3, LuffyLv3];

/**
 * LuffyImg 컴포넌트는 상담 ID에 따라 러피의 이미지와 레벨을 표시합니다.
 * 
 * @component
 */
export default function LuffyImg() {
  // 상담 ID와 시작 날짜를 가져옵니다.
  const { counselId, startdate } = useCounselStore();

  // 경험치 레벨 데이터를 가져옵니다.
  const { data, isLoading } = useQuery({
    queryKey: ["expLevel", counselId],
    queryFn: () => fetchExpLevel(counselId),
    refetchOnWindowFocus: false,
  });

  // 현재 날짜와 시작 날짜의 차이를 계산합니다.
  const today = dayjs();
  const anni = dayjs(startdate);
  const rs = today.diff(anni, "day", true);
  const durationDay = Math.floor(rs);

  // 데이터가 로딩 중일 때 로딩 메시지를 표시합니다.
  if (isLoading) {
    return <div>로딩중</div>;
  }

  // 데이터를 로드하면 러피의 이미지와 레벨을 표시합니다.
  return (
    <div id="CherryLuffy" className="h-full col-span-4 flex flex-col items-center">
      <p className="text-[2vw] text-text-black ">{durationDay} 일차 러피</p>
      <div className="h-[50%] mt-[4vw]">
        <img
          className="animate-wiggle"
          src={LuffyImage[data.level]}
          alt={`Luffy Level ${data.level}`}
        />
      </div>
      <p className="text-text-black font-bold text-[2vw]">
        {Level[data.level]}
      </p>
    </div>
  );
}
