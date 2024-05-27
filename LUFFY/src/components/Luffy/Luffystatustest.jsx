import dayjs from "dayjs";
import useCounselStore from "../../stores/useCounselStore";
import useUserStore from "../../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import {
  fetchClipCnt,
  fetchExpLevel,
  fetchMeetingSum,
} from "../../services/luffyService";
import LuffyGraph from "./LuffyGraph";

/**
 * Luffystatustest 컴포넌트는 사용자의 상담 및 활동 데이터를 기반으로 
 * 그래프를 시각화하여 표시합니다.
 * 
 * @component
 */
export default function Luffystatustest() {
  const { userInfos, startdate, counselId } = useCounselStore();
  const { nickname } = useUserStore();
  
  // 현재 날짜와 시작 날짜의 차이를 계산합니다.
  const today = dayjs();
  const anni = dayjs(startdate);
  const rs = today.diff(anni, "day", true);
  const durationDay = Math.floor(rs);

  // 클립 갯수 데이터를 가져옵니다.
  const { data: clipCntdata, isLoading: loading1 } = useQuery({
    queryKey: ["clipCnt", counselId],
    queryFn: () => fetchClipCnt(counselId),
    refetchOnWindowFocus: false,
  });

  // 경험치 레벨 데이터를 가져옵니다.
  const { data: expLeveldata, isLoading: loading2 } = useQuery({
    queryKey: ["expLevel", counselId],
    queryFn: () => fetchExpLevel(counselId),
    refetchOnWindowFocus: false,
  });

  // 상담 시간 합계를 가져옵니다.
  const { data: meetingsum, isLoading: loading3 } = useQuery({
    queryKey: ["meetingSum", counselId],
    queryFn: () => fetchMeetingSum(counselId),
    refetchOnWindowFocus: false,
  });

  // 데이터가 로딩 중일 때 로딩 메시지를 표시합니다.
  if (loading1 || loading2 || loading3) {
    return <div>로딩중</div>;
  }

  // 데이터를 로드하면 LuffyGraph 컴포넌트를 렌더링합니다.
  return (
    <div id="Total" className="col-span-4 flex flex-col gap-2 h-[37vw]">
      <LuffyGraph 
        exp={expLeveldata.exp} 
        numberOfBoxes={clipCntdata.clipCnt} 
        hour={meetingsum.hour} 
        minute={meetingsum.minute} 
        second={meetingsum.second}
      />
    </div>
  );
}
