import { useRef } from "react";

/**
 * 비디오 설정 컴포넌트
 */
export default function VideoSettings({ meetingInfo, setMeetingInfo }) {
    const readyCam = useRef();

    /**
     * 로컬 비디오 설정 업데이트
     * @param {boolean} on - 비디오 상태
     * @param {number} volume - 볼륨 값
     * @param {number} target - 타겟 값
     */
    const updateLocalVideo = function (on, volume, target) {
        if (meetingInfo.connect?.peerConnection?.connectionState === "connected") {
            sendMessage(
                JSON.stringify({
                    cmd: "response peer cam state",
                    data: {
                        videoOn: on,
                        volume: volume,
                    },
                })
            );
        }

        if (target === 0) {
            if (meetingInfo.video.local.videoOn !== on || !readyCam.current.srcObject) {
                readyCam.current.srcObject = on
                    ? meetingInfo.stream.localMediaStream
                    : new MediaStream();
            }
            readyCam.current.volume = volume;
        } else {
            if (meetingInfo.video.local.videoOn !== on || !readyCam?.current.srcObject) {
                readyCam.current.srcObject = on
                    ? meetingInfo.stream.localMediaStream
                    : new MediaStream();
            }
            readyCam.current.volume = 0;
        }

        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            newMeetingInfo.video.local.videoOn = on;
            newMeetingInfo.video.local.volume = volume;
            return newMeetingInfo;
        });
    };

    /**
     * 리모트 비디오 설정 업데이트
     * @param {boolean} on - 비디오 상태
     * @param {number} volume - 볼륨 값
     * @param {number} volumeFactor - 볼륨 팩터
     * @param {boolean} force - 강제 설정 여부
     */
    const updateRemoteVideo = function (on, volume, volumeFactor, force) {
        if (remoteCam.current) {
            if (meetingInfo.video.remote.videoOn !== on) {
                remoteCam.current.srcObject = on
                    ? meetingInfo.stream.remoteMediaStream
                    : new MediaStream();
            }
            if (
                meetingInfo.video.remote.volume !== volume ||
                meetingInfo.video.remote.volumeFactor !== volumeFactor ||
                force
            ) {
                remoteCam.current.volume = volume * volumeFactor;
            }
        }

        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            newMeetingInfo.video.remote.videoOn = on;
            newMeetingInfo.video.remote.volume = volume;
            newMeetingInfo.video.remote.volumeFactor = volumeFactor;
            return newMeetingInfo;
        });
    };

    return (
        <>
            {/* Your component JSX */}
        </>
    );
}
