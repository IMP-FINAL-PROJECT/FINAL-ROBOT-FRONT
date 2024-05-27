import { motion } from "framer-motion";
import { BounceLoader } from "react-spinners";

/**
 * CallBox 컴포넌트는 화상 통화 UI를 렌더링합니다.
 * 
 * @component
 * @param {object} props - 컴포넌트에 전달되는 props
 * @param {object} props.meetingInfo - 화상 통화 상태 정보
 * @param {object} props.camContainer - 화상 통화 컨테이너에 대한 ref
 * @param {object} props.remoteCam - 원격 카메라에 대한 ref
 * @param {object} props.localCamContainer - 로컬 카메라 컨테이너에 대한 ref
 * @param {object} props.localCam - 로컬 카메라에 대한 ref
 */
function CallBox({ meetingInfo, camContainer, remoteCam, localCamContainer, localCam }) {
  return (
    <motion.div
      className={`h-full w-full relative flex flex-col-reverse items-center bg-[#E2E3E5] rounded-t-2xl z-50 shadow-md ${
        !meetingInfo.isModalOpen ? "" : "hidden"
      }`}
      ref={camContainer}
    >
      <video
        className="h-full bg-[#E2E3E5] absolute rounded-t-2xl video-mirror"
        id="remoteCam"
        ref={remoteCam}
        autoPlay
        playsInline
        muted
      ></video>

      {(meetingInfo.connect.offerState === 2 || meetingInfo.connect.offerState === 1) && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-1000">
          <BounceLoader color={"white"} size={100} />
          <h1 className="text-white text-2xl mt-[3vh]">
            {meetingInfo.connect.offerState === 2 ? "화면을 로딩중입니다." : "상대방을 기다리는중"}
          </h1>
        </div>
      )}

      <motion.div
        className={`h-[30%] w-[30%] z-100 relative left-[34.3%] bottom-[1%] rounded-2xl bg-pink flex flex-col justify-center items-center ${
          meetingInfo.video.local.videoOn ? "" : "hidden"
        }`}
        drag
        dragConstraints={camContainer}
        ref={localCamContainer}
        dragMomentum={false}
      >
        <video ref={localCam} autoPlay playsInline className="h-[90%] w-[90%] absolute video-mirror"></video>
      </motion.div>
    </motion.div>
  );
}

export default CallBox;
