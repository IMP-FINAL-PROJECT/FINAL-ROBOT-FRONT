import micImg from "../../assets/meeting/mic.svg";
import camImg from "../../assets/meeting/cam.svg";
import barImg from "../../assets/meeting/bar.svg";

function WaitingBox({
	meetingInfo,
	updateLocalVideo,
	readyCam,
	setConnection,
	setMeetingInfo,
	listen,
}) {
	return (
		<div
			className={`mockup-window border border-base-300 h-full w-[80%] bg-gray-100 flex flex-col items-center rounded-t-2xl shadow-md ${
				meetingInfo.isModalOpen ? "" : "hidden"
			}`}
		>
				<div className="h-full w-full  flex flex-col-reverse justify-center ">
					<div className="h-[10%] bg-white rounded-b-2xl flex justify-between items-center ">
                    <div></div>
                    <div className="flex">
						<button
							className="w-12 h-12 my-5 mx-8  flex flex-col justify-center items-center relative"
							onClick={(event) => {
								event.preventDefault();
								const targetVolume = meetingInfo.video.local.volume == 0 ? 0.5 : 0;
								const targetOn = meetingInfo.video.local.videoOn;
								updateLocalVideo(targetOn, targetVolume, 0);
							}}
						>
							<img className="h-full absolute" src={micImg} />
							{meetingInfo.video.local.volume == 0 && (
								<img className="h-full absolute" src={barImg}></img>
							)}
						</button>
						<button
							className="w-12 h-12 my-5 mx-8  flex flex-col justify-center items-center relative"
							onClick={(event) => {
								event.preventDefault();
								const targetVolume = meetingInfo.video.local.volume;
								const targetOn = !meetingInfo.video.local.videoOn;
								updateLocalVideo(targetOn, targetVolume, 0);
							}}
						>
							<img className="h-full absolute" src={camImg} />
							{!meetingInfo.video.local.videoOn && (
								<img className="h-full absolute" src={barImg}></img>
							)}
						</button>
                        </div>
                        <button
						className={
							meetingInfo.stream.localMediaStream.getTracks().length !== 0
								? "px-6 h-16 bg-lime-400 rounded-2xl font-extrabold text-xl  mx-5"
								: "px-6 h-16 bg-gray-100 rounded-2xl font-extrabold text-xl  mx-5"
						}
						disabled={meetingInfo.stream.localMediaStream.getTracks().length === 0}
						onClick={() => {
							setConnection();

							setMeetingInfo((prevMeetingInfo) => {
								const newMeetingInfo = { ...prevMeetingInfo };
								newMeetingInfo.isModalOpen = false;
								return newMeetingInfo;
							});

							updateLocalVideo(
								meetingInfo.video.local.videoOn,
								meetingInfo.video.local.volume,
								1
							);
						}}
					>
						입장
					</button>
					</div>

					<div className="h-full w-full rounded-t-2xl bg-gray-100 flex mb-1 justify-center relative ">
						<video
							id="ready-cam"
							ref={readyCam}
							autoPlay
							playsInline
							className="absolute h-full w-full video-mirror "
						></video>
					</div>

				</div>
				
			</div>
	);
}

export default WaitingBox;
