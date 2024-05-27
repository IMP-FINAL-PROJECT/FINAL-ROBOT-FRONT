import { useQuery } from "@tanstack/react-query";
import useCounselStore from "../../stores/useCounselStore";
import { fetchClipCnt } from "../../services/luffyService";

/**
 * ClipCnt 컴포넌트는 상담 ID에 따른 클립 수를 가져와서 보여줍니다.
 * 
 * @component
 */
export default function ClipCnt() {
  // useCounselStore 훅을 사용하여 상담 ID를 가져옵니다.
  const { counselId } = useCounselStore();

  // useQuery 훅을 사용하여 클립 수 데이터를 가져옵니다.
  const { data, isLoading } = useQuery({
    queryKey: ["clipCnt", counselId], // 오타 수정: "cilpCnt" -> "clipCnt"
    queryFn: () => fetchClipCnt(counselId),
  });

  // 로딩 중일 때 로딩 메시지를 표시합니다.
  if (isLoading) {
    return <div>로딩중</div>;
  }

  // 데이터가 로드되면 클립 수를 표시합니다.
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
