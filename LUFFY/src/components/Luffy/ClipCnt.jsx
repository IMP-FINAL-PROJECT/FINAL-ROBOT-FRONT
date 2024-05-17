import { useQuery } from "@tanstack/react-query";
import useCounselStore from "../../stores/useCounselStore";
import { fetchClipCnt } from "../../services/luffyService";

export default function ClipCnt() {
  const { counselId } = useCounselStore();
  const { data, isLoading } = useQuery({
    queryKey: ["cilpCnt", counselId],
    queryFn: () => fetchClipCnt(counselId),
  });
  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <p className="text-[1.5vw] text-text-black font-bold">
        우리가 모은 클립 갯수는?
      </p>
      <p className="text-[1.3vw] text-text-black font-bold">
        <span className="text-[2vw] text-cherry">{data.clipCnt}</span>개
      </p>
    </>
  );
}
