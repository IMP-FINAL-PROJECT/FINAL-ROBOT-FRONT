import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { checkByCode } from "../../services/userService";
import useMoodStore from "../../stores/useMoodStore";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAccessToken } from "../../utils/Mood";

/**
 * Signup 컴포넌트는 사용자 가입을 위한 폼을 렌더링합니다.
 *
 * @component
 * @returns {JSX.Element}
 */
const Signup = () => {
	const navigate = useNavigate();
	const [hasCode, setHasCode] = useState(true);
	const [codeChecked, setCodeChecked] = useState(false);
	const codeRef = useRef();
	const today = dayjs();
	const { birth, gender, id, name } = useMoodStore();
	const [searchParams, setSearchParams] = useSearchParams();
	const [disabledSignup, setDisabledSignup] = useState(false);

	const code = searchParams.get("code");
	console.log(birth);

	useEffect(() => {
		if (code) {
			setHasCode(false);
			codeRef.current.value = code;
		}
	}, [code]);

	const { mutate } = useMutation({
		mutationFn: checkByCode,
		onSuccess: (data) => {
			setCodeChecked(data.success);
		},
	});

	const checkCode = () => {
		mutate(codeRef.current.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const fd = new FormData(event.target);
		const data = Object.fromEntries(fd.entries());

		console.log(JSON.stringify(data));

		const fetchJoin = async () => {
			setDisabledSignup(true);
			console.log(id);
			const token = await getAccessToken(id);
			console.log(token);
			const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/user/join`, {
				method: "POST",
				headers: {
					Authorization: token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			setDisabledSignup(false);
			if (!response.ok) {
				throw Error("join fetch Error");
			} else {
				navigate("/user/login");
			}
		};

		fetchJoin();
	};

	return (
		<div className="flex justify-center items-center h-full text-[2vw]">
			<div className="bg-pink h-[90%] w-[80%] flex flex-col items-center rounded-xl shadow-2xl">
				<div className="h-[10%] my-[2vh]">상담코드를 입력해주세요</div>
				<form
					method="post"
					onSubmit={handleSubmit}
					className="grow grid grid-rows-6 w-full px-[10%] h-[100%] max-h-full"
				>
					<div>
						<motion.label
							className="form-control w-full"
							whileHover={{ scale: 1.2 }}
							transition={{ duration: 0.5 }}
						>
							<div className="label">
								<span className="label-text">
									<span className="text-[1.2vw]">이름&nbsp;</span>
								</span>
							</div>
							<input
								type="text"
								name="nickname"
								id="nickname"
								value={name}
								className="input input-bordered w-[100%] border-solid border-2 border-text-gray"
								required
								readOnly
							/>
						</motion.label>
					</div>
					<div>
						<motion.label
							className="form-control w-full"
							whileHover={{ scale: 1.2 }}
							transition={{ duration: 0.5 }}
						>
							<div className="label">
								<span className="label-text">
									<span className="text-[1.2vw]">e-mail</span>
								</span>
							</div>
							<input
								type="email"
								name="email"
								id="email"
								value={id}
								className="input input-bordered w-full border-solid border-2 border-text-gray"
								required
								readOnly
							/>
						</motion.label>
					</div>
					<div>
						<motion.label
							className="form-control w-full"
							whileHover={{ scale: 1.2 }}
							transition={{ duration: 0.5 }}
						>
							<div className="label">
								<span className="label-text">
									<span className="text-[1.2vw]">당신의 생일</span>
								</span>
							</div>
							<input
								type="date"
								name="birthday"
								id="birthday"
								value={birth}
								className="input input-bordered w-full border-solid border-2 border-text-gray"
								max={today.format("YYYY-MM-DD")}
								required
								readOnly
							/>
						</motion.label>
					</div>
					<div>
						<motion.div
							className="form-control w-full"
							whileHover={{ scale: 1.2 }}
							transition={{ duration: 0.5 }}
						>
							<div className="label w-full flex justify-between relative">
								<div className="text-[1.2vw] flex items-center">
									상담사인가요?
									<input
										type="checkbox"
										checked={!hasCode}
										onChange={() => setHasCode(!hasCode)}
										className="checkbox bg-white w-[1.5vw] h-[1.5vw] mx-[1vw]"
									/>
								</div>
							</div>
							<div className="flex flex-row justify-between">
								<div className="w-[70%]">
									<input
										type="text"
										name="code"
										id="code"
										className="input input-bordered w-full border-solid border-2 border-text-gray"
										placeholder="상담 코드 입력"
										disabled={!hasCode}
										ref={codeRef}
										required
									/>
								</div>
								<div className="h-[2vh]">
									<button
										type="button"
										onClick={checkCode}
										className="btn bg-cherry text-white hover:bg-white hover:text-cherry h-full"
										disabled={!hasCode}
									>
										확인
									</button>
								</div>
							</div>
						</motion.div>
					</div>
					<div>
						<motion.label
							className="form-control w-full"
							whileHover={{ scale: 1.2 }}
							transition={{ duration: 0.5 }}
						>
							<div className="label">
								<span className="label-text">
									<span className="text-[1.2vw]">상담 시작일</span>
								</span>
							</div>
							<input
								type="date"
								name="startdate"
								id="startdate"
								className="input input-bordered w-full border-solid border-2 border-text-gray"
								value={today.format("YYYY-MM-DD")}
								disabled={hasCode}
								required
								readOnly
							/>
						</motion.label>
					</div>

					<div className="flex items-center">
						<button
							className="btn bg-subpuple text-white w-full hover:bg-subpuple10 hover:text-cherry"
							disabled={(hasCode && !codeChecked) || disabledSignup}
						>
							가입 완료
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
