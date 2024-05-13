import { Outlet } from "react-router-dom";
import MoodLogin from "../../components/User/MoodLogin";

const Login = () => {
	return (
		<div className="flex justify-center items-center h-full text-[35px]">
			<div className="bg-beige10 h-[38%] w-[80%] flex flex-col items-center rounded-xl shadow-2xl">
				<div className=" p-[8%]">로그인</div>
				<div className="grow flex justify-center items-center w-[100%] pb-[10%]">
					<MoodLogin />
					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
};

export default Login;
