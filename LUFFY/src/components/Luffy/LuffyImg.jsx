import { useQuery } from "@tanstack/react-query";
import LuffyLv1 from "../../assets/Luffy/LuffyLv1.png";
import LuffyLv2 from "../../assets/Luffy/LuffyLv2.png";
import LuffyLv3 from "../../assets/Luffy/LuffyLv3.png";
import dayjs from "dayjs";
import useCounselStore from "../../stores/useCounselStore";
import { fetchExpLevel } from "../../services/luffyService";

const Level = ["아기 러피", "학생 러피", "어른 러피"];
const LuffyImage = [LuffyLv1, LuffyLv2, LuffyLv3, LuffyLv3, LuffyLv3];

export default function LuffyImg() {

  const { counselId,startdate } = useCounselStore();
  const { data, isLoading } = useQuery({
    queryKey: ["expLevel", counselId],
    queryFn: () => fetchExpLevel(counselId),
    refetchOnWindowFocus: false,
  });
  const today = dayjs();
  const anni = dayjs(startdate);
  const rs = today.diff(anni, "day", true);
  const durationDay = Math.floor(rs);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div id="CherryLuffy" className="h-full col-span-4 flex flex-col items-center">
        <p className="text-[2vw] text-text-black ">{durationDay} 일차 러피</p>
      <div className="h-[50%] mt-[4vw]  ">
        <img
          className="animate-wiggle"
          src={LuffyImage[data.level]}
          alt="LuffyLv1"
        />
        
      </div>
      <p className="text-text-black font-bold text-[2vw] ">
        {Level[data.level]}
      </p>
      
      
    </div>
  );
}
