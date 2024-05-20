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

export default function Luffystatustest() {
  const { userInfos, startdate, counselId } = useCounselStore();
  const {nickname}  = useUserStore();
  const today = dayjs();
  const anni = dayjs(startdate);
  const rs = today.diff(anni, "day", true);
  const durationDay = Math.floor(rs);

  const { data: clipCntdata, isLoading: loading1 } = useQuery({
    queryKey: ["clipCnt", counselId],
    queryFn: () => fetchClipCnt(counselId),
    refetchOnWindowFocus: false,
  });

  const { data: expLeveldata, isLoading: loading2 } = useQuery({
    queryKey: ["expLevel", counselId],
    queryFn: () => fetchExpLevel(counselId),
    refetchOnWindowFocus: false,
  });

  const { data: meetingsum, isLoading: loading3 } = useQuery({
    queryKey: ["meetingSum", counselId],
    queryFn: () => fetchMeetingSum(counselId),
    refetchOnWindowFocus: false,
  });

  if (loading1 || loading2 || loading3) {
    return <div>로딩중</div>;
  }

  return (
    <div id="Total" className="col-span-4 flex flex-col gap-2 h-[37vw]">

        
        <LuffyGraph exp={expLeveldata.exp} numberOfBoxes={clipCntdata.clipCnt} hour={meetingsum.hour} minute={meetingsum.minute} second={meetingsum.second}/>
        

      
      
    </div>
  );
}
