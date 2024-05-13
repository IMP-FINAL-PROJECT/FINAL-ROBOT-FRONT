/* eslint-disable react/prop-types */
import Modal from "./Modal";
import Copy from "../../assets/copy.svg";
import { motion } from "framer-motion";
import { useState } from "react";
import { userDeleteFetch } from "../../services/userService";

const WaitingModal = ({ onClose, code, userId, counselId }) => {
	const [copied, setCopied] = useState(false);

	const handleCopyClipBoard = () => {
		try {
			navigator.clipboard.writeText(code);
			setCopied(true);
		} catch (err) {
			console.log(err);
		}
	};

	function deleteUser() {
		if (confirm("정말 탈퇴하시겠어요?")) {
			userDeleteFetch({ userId, counselId });
			onClose();
		}
	}

	return (
		<Modal
			onClose={onClose}
			dialogCss="w-[30vw] h-[30vh] bg-white rounded-xl top-[10%] py-[2vh] border-solid border-2 border-text-black"
		>
			<div className="flex flex-col items-center h-full text-[1vw]">
				<div className="text-[1vw] ">
					<span className="text-cherry">상담원</span>을 기다리는 중이에요
				</div>
				<div className="text-[2vw]">기다리는 중...</div>
				<motion.div
					className="grow flex justify-center items-center relative"
					onClick={handleCopyClipBoard}
					whileHover={{ scale: 1.2 }}
				>
					<input
						type="text"
						readOnly
						value={code}
						className="input input-bordered w-full border-solid border-2 border-text-gray text-[1vw]"
					/>
					<img src={Copy} className="absolute w-[1.3vw] h-[1.3vw] left-[85%]" />
					{copied && (
						<motion.div
							className="absolute top-[10%]"
							initial={{ scale: 0, y: 30 }}
							animate={{ scale: 1, y: 0 }}
						>
							복사되었어요!
						</motion.div>
					)}
				</motion.div>

				<div>
					<span className="text-[0.7vw]">
						혹시 가입을 잘못하셨나요?{" "}
						<span
							className="underline text-red-500 hover:cursor-pointer"
							onClick={deleteUser}
						>
							여기
						</span>
						를 눌러 회원탈퇴를 진행하세요!
					</span>
				</div>
			</div>
		</Modal>
	);
};

export default WaitingModal;
