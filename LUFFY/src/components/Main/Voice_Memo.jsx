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
			<div className="flex justify-end items-center">
				<motion.div
					className="w-[17vw] relative hover:cursor-pointer"
					whileHover={{ scale: 1.1 }}
					onHoverStart={(event, info) => {setcolor("bg-skyblue")}} 
					onHoverEnd={(event, info) => {setcolor("bg-skyblue10")}} 
					onClick={showMemo}
				>
					<div className={`max-w-full h-full grid grid-rows-11 justify-center ${color} items-center justify-around rounded-[20px] shadow-md`}>
						<div className="text-[1vw] text-center row-start-2 max-w-full ">
							<span>Voice Memo</span>
						</div>
						<div
							className="row-start-3 row-span-2 max-w-[17vw] w-[17vw] text-center px-[4vw] text-[0.8vw]"
							style={{
								whiteSpace: "pre-line",
								wordWrap: "break-word",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{memo || "작성된 메모가 없어요."}
						</div>
						<img src={VoiceMemo} alt="VoiceMemo" className="row-start-6 row-span-5 self-end justify-self-center" style={{ height: 60 }} />
					</div>
				</motion.div>
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
