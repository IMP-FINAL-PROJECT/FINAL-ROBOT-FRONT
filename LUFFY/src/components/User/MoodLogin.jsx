import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import WaitingModal from "../Modal/WaitingModal";
import { AnimatePresence } from "framer-motion";


import useUserStore from "../../stores/useUserStore";
import useCounselStore from "../../stores/useCounselStore";
import useMoodStore from "../../stores/useMoodStore";

import { useSearchParams } from "react-router-dom";


import { moodLoginFetch } from "../../services/userService";
import axios from "axios"


const MoodLogin = () => {
	const navigate = useNavigate();
	const [openWaitingModal, setOpenWaitingModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
	const { setUserInfo } = useUserStore();
	const { setCounselInfo } = useCounselStore();
	const { setMoodInfo,id } = useMoodStore();

	const [userId, setUserId] = useState(undefined);
	const [counselId, setCounselId] = useState(undefined);
	const [counselCode, setCounselCode] = useState("");

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [searchParams, setSearchParams] = useSearchParams();
	const code = searchParams.get("code");

    const login = async (username) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await moodLoginFetch();
            console.log(data);
            if (data.verified) {
                console.log(data);
                const user = data.userDto;
                const counsel = data.counselDto;
                if (!counsel.matching) {
                    setCounselCode(counsel.code);
                    setCounselId(counsel.id);
                    setUserId(user.id);
                    setOpenWaitingModal(true);
                } else {
                    setUserInfo(user.moodId, user.nickname, user.id, user.email, user.birthday);
                    setCounselInfo(
                        counsel.id,
                        counsel.code,
                        counsel.user1,
                        counsel.user2,
                        counsel.startdate,
                        data.userInfos,
                        data.quoteDto
                    );
                    navigate("/");
                }
            } else {
                navigate(`/user/signup${code ? `?code=${code}` : ""}`);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };


	async function handleLogin() {

		try {
			const response = await axios.post(`${import.meta.env.VITE_MOOD_BACKEND_URL}/api/login`, {
				id: username,
				password: password
			});
			console.log('Login successful:', response.data.data);
			
			setMoodInfo(response.data.data.birth, response.data.data.gender, response.data.data.id, response.data.data.name)
			console.log("asd12")
			console.log("asdasd"+id)
			login( id )
		} catch (error) {
			console.error('Login failed:', error.response?.data || error.message);
			// Optionally handle errors, e.g., show an error message
		}
		
	}



	return (
		<>
			<div className="grow grid grid-rows-6 w-full px-[10%] h-[100%] max-h-full items-center justify-items-center">
  				<input
    type="username"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="input h-[60px]  w-[90%] mb-3 border-solid border-2 border-text-gray text-[25px]"
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="input h-[60px] w-[90%] mb-3 border-solid border-2 border-text-gray text-[25px]"
  />

  <button
    onClick={handleLogin}
    className="btn bg-subpuple text-white h-[60px] w-[90%] sw-[80%] hover:bg-subpuple10 hover:text-cherry text-[20px]"
  >
    Login
  </button>
</div>



			<AnimatePresence>
				{openWaitingModal && (
					<WaitingModal
						onClose={() => setOpenWaitingModal(false)}
						code={counselCode}
						userId={userId}
						counselId={counselId}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default MoodLogin;
