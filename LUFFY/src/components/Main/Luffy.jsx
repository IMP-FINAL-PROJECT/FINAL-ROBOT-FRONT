import { useQuery } from "@tanstack/react-query";
import OperatorIcon from "../../assets/Icon/OperatorIcon.svg";
import LuffyLv1 from "../../assets/Luffy/LuffyLv1.png";
import LuffyLv2 from "../../assets/Luffy/LuffyLv2.png";
import LuffyLv3 from "../../assets/Luffy/LuffyLv3.png";

import useCounselStore from "../../stores/useCounselStore";
import useUserStore from "../../stores/useUserStore";
import { fetchExpLevel } from "../../services/luffyService";

const Level = ["아기 러피", "학생 러피", "어른 러피"];
const LuffyImage = [LuffyLv1, LuffyLv2, LuffyLv3, LuffyLv3, LuffyLv3];
const counsellv = ["상담 초보", "상담이랑 친해진", "상담에 진심인"];

export default function Luffy({ dday }) {
  const { counselId, userInfos } = useCounselStore();
  const {nickname}  = useUserStore();
  const { data: expLevel, isLoading } = useQuery({
    queryKey: ["expLevel", counselId],
    queryFn: () => fetchExpLevel(counselId),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }
  return (
    <>
      <div id="LuffyState" className="col-span-2 flex flex-col items-center">
        <div id="LuffyImg">
          <img
            className="mt-[1vw]"
            src={LuffyImage[expLevel.level]}
            alt="LuffyImg"
          />
        </div>
        <p id="LuffyName" className="text-[1.2vw] text-cherry font-bold">
          {Level[expLevel.level]}
        </p>
        <progress
          id="LuffyExp"
          className="LuffyExp h-2 w-[7vw]"
          max="100"
          value={expLevel.exp}
        />
      </div>
      <div
        id="LuffyDescrption"
        className="h-[15vw] mt-[2vw] col-span-3 flex flex-col items-center justify-around"
      >
        <p id="LuffyCounsel" className="text-[1.5vw] font-bold text-text-black">
          {counsellv[expLevel.level]}{" "}
          <span className="text-cherry">{nickname}</span>
        </p>
        <div id="LuffyCounselName" className="flex flex-row items-center">

          <div>
            <img src={OperatorIcon} alt="OperatorIcon" width={40} className="mr-3" />
          </div>
          <p className="text-[1.2vw] text-text-black">
           <span style={{ fontWeight: 'bold' }}> {nickname === userInfos[0].nickname ? userInfos[1].nickname : userInfos[0].nickname3}</span> 상담사
          </p>
        </div>
        <p className="text-[1.2vw] text-text-black"></p>
        <button id="GoLuffy" className="text-[1.2vw] text-text-black">
          경험치 기록 보기
        </button>
      </div>
    </>
  );
}
