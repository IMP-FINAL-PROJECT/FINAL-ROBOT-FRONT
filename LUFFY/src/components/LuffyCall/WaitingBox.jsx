import micImg from "../../assets/meeting/mic.svg";
import camImg from "../../assets/meeting/cam.svg";
import barImg from "../../assets/meeting/bar.svg";

/**
 * WaitingBox 컴포넌트는 사용자가 회의에 입장하기 전에 비디오 및 오디오 설정을 조정할 수 있는 대기 화면을 제공합니다.
 * 
 * @component
 * @param {object} props - 컴포넌트에 전달되는 props
 * @param {object} props.meetingInfo - 회의 정보
 * @param {function} props.updateLocalVideo - 로컬 비디오 업데이트 함수
 * @param {object} props.readyCam - 준비된 카메라에 대한 ref
 * @param {function} props.setConnection - 연결 설정 함수
 * @param {function} props.setMeetingInfo - 회의 정보 설정 함수
 * @param {function} props.listen - 음성 인식 시작 함수
 */
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
      <div className="h-full w-full flex flex-col-reverse justify-center">
        <div className="h-[10%] bg-white rounded-b-2xl flex justify-between items-center">
          <div></div>
          <div className="flex">
            <button
              className="w-12 h-12 my-5 mx-8 flex flex-col justify-center items-center relative"
              onClick={(event) => {
                event.preventDefault();
                const targetVolume = meetingInfo.video.local.volume === 0 ? 0.5 : 0;
                const targetOn = meetingInfo.video.local.videoOn;
                updateLocalVideo(targetOn, targetVolume, 0);
              }}
            >
              <img className="h-full absolute" src={micImg} />
              {meetingInfo.video.local.volume === 0 && (
                <img className="h-full absolute" src={barImg}></img>
              )}
            </button>
            <button
              className="w-12 h-12 my-5 mx-8 flex flex-col justify-center items-center relative"
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
                ? "px-6 h-16 bg-lime-400 rounded-2xl font-extrabold text-xl mx-5"
                : "px-6 h-16 bg-gray-100 rounded-2xl font-extrabold text-xl mx-5"
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

        <div className="h-full w-full rounded-t-2xl bg-gray-100 flex mb-1 justify-center relative">
          <video
            id="ready-cam"
            ref={readyCam}
            autoPlay
            playsInline
            className="absolute h-full w-full video-mirror"
          ></video>
        </div>
      </div>
    </div>
  );
}

export default WaitingBox;
