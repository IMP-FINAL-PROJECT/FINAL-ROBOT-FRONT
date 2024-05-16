import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getMemoFetch } from "../../services/diaryService";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VoiceMemo from "../../assets/Icon/Mike.svg";
import MemoModal from "../Modal/MemoModal";
import useCounselStore from "../../stores/useCounselStore";

export default function Voice_Memo() {
	const { counselId } = useCounselStore();
	const dateFormat = dayjs().format("YYYY-MM-DD");
	const [openMemoModal, setOpenMemoModal] = useState(false);
	const [memo, setMemo] = useState("");
	const [color, setcolor] = useState("bg-skyblue10");

	function showMemo() {
		setOpenMemoModal(true);
	}

	function closeMemoModal() {
		setOpenMemoModal(false);
	}

	const { data: memoData } = useQuery({
		queryKey: ["memo", dateFormat],
		queryFn: () => getMemoFetch(counselId, dateFormat),
		staleTime: 0,
		select: (data) => data.memo,
	});

	useEffect(() => {
		if (memoData) {
			setMemo(memoData.content);
		}
	}, [memoData]);

	function handleMemoData(content) {
		setMemo(content);
	}

	return (
		<>
				
					<div className={`w-[15vw] h-[15vw] rounded-[50px] shadow-lg text-center items-center leading-10 bg-skyblue flex flex-col `} onClick={showMemo}>
						
						<div className="text-[1.3vw] text-center  max-w-full mt-[0.8vw] italic">
							<span >Voice Memo</span>
						</div>
						<div className="divider  divider-start italic w-[14vw] ml-[0.5vw]">Content</div>
						<div
							onClick={showMemo}
							className="max-w-[17vw] w-[17vw] text-center px-[4vw] text-[0.8vw]"
							style={{
								whiteSpace: "pre-line",
								wordWrap: "break-word",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{memo || "작성된 메모가 없어요."}
						</div>

					</div>
			<AnimatePresence>
				{openMemoModal && (
					<MemoModal
						onClose={closeMemoModal}
						memo={memo}
						handleMemoData={handleMemoData}
						counselId={counselId}
						date={dateFormat}
					></MemoModal>
				)}
			</AnimatePresence>
		</>
	);
}
