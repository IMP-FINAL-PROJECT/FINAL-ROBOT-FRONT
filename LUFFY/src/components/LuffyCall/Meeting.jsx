import { useState } from "react";
import LeftWindow from "./LeftWindow";
import RightWindow from "./RightWindow";
import useCounselStore from "../../stores/useCounselStore";
import useUserStore from "../../stores/useUserStore";
import sendImg from "../../assets/SendIcon.svg";
import "./Meeting.css";

/**
 * WebRTC Meeting 컴포넌트
 */
export default function Meeting() {
    const { moodId, nickname, userId } = useUserStore();
    const { user1, user2, counselId, userInfos } = useCounselStore();

    const [meetingInfo, setMeetingInfo] = useState({
        stream: {
            localMediaStream: new MediaStream(),
            remoteMediaStream: new MediaStream(),
        },

        video: {
            local: {
                videoOn: false,
                volume: 0.0,
            },
            remote: {
                videoOn: false,
                volume: 0.0,
                volumeFactor: 1.0,
            },
        },

        connect: {
            conn: null,
            peerConnection: null,
            dataChannel: null,
            offerState: 0,
            prevOfferState: 0,
        },

        chattingHistory: [],

        clipHistory: [],

        rightWindow: 0,
        scriptHistory: [],
        showMessage: false,
        showMessageContent: "",

        clipReceived: false,

        init: false,

        meetingId: null,

        isModalOpen: true,
    });

    const readyCam = useRef();
    const chattingWindow = useRef();
    const clipWindow = useRef();
    const scriptWindow = useRef();
    const localCam = useRef();
    const remoteCam = useRef();
    const camContainer = useRef();
    const localCamContainer = useRef();

    if (!meetingInfo.init) {
        getLocalMediaStream();
        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            newMeetingInfo.init = true;
            return newMeetingInfo;
        });
    }

    useEffect(() => {
        if (meetingInfo.chattingHistory.length && meetingInfo.rightWindow === 0) {
            chattingWindow.current.childNodes[
                meetingInfo.chattingHistory.length - 1
            ].scrollIntoView({
                block: "end",
            });
        }
    }, [meetingInfo.chattingHistory.length, meetingInfo.rightWindow]);

    useEffect(() => {
        if (meetingInfo.clipHistory.length && meetingInfo.rightWindow === 1) {
            clipWindow.current.childNodes[meetingInfo.clipHistory.length - 1].scrollIntoView({
                block: "end",
            });
        }
    }, [meetingInfo.clipHistory.length, meetingInfo.rightWindow]);

    useEffect(() => {
        if (meetingInfo.scriptHistory.length && meetingInfo.rightWindow === 2) {
            scriptWindow.current.childNodes[meetingInfo.scriptHistory.length - 1].scrollIntoView({
                block: "end",
            });
        }
    }, [meetingInfo.scriptHistory.length, meetingInfo.rightWindow]);

    function endCall() {
        console.log("Leave");
        meetingInfo?.connect?.dataChannel?.close();
        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            newMeetingInfo.init = false;
            return newMeetingInfo;
        });

        stop();

        meetingInfo?.connect?.dataChannel?.close();
        meetingInfo?.connect?.peerConnection?.close();
        meetingInfo?.connect?.conn?.close();

        if (meetingId2 !== null && user1 === userId) {
            console.log("미팅 종료 알림");
            fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/meeting/${meetingId2}`, {
                method: "PUT",
                headers: {
                    Accept: "*/*",
                },
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });

            meetingId2 = null;
        }
    }

    window.onbeforeunload = (event) => {
        event.preventDefault();
        console.log("unload", event);
    };

    return (
        <div className="h-full w-full flex flex-row contents-center ">
            <div className={`${!meetingInfo.isModalOpen ? "w-9/12 flex flex-col justify-center" : " w-full content-center items-center"}`}>
                <LeftWindow
                    meetingInfo={meetingInfo}
                    send={send}
                    updateLocalVideo={updateLocalVideo}
                    readyCam={readyCam}
                    setConnection={setConnection}
                    setMeetingInfo={setMeetingInfo}
                    listen={listen}
                    camContainer={camContainer}
                    remoteCam={remoteCam}
                    localCamContainer={localCamContainer}
                    localCam={localCam}
                    sendMessage={sendMessage}
                    updateRemoteVideo={updateRemoteVideo}
                    stop={stop}
                    endCall={endCall}
                />
            </div>
            {!meetingInfo.isModalOpen ? 
            <div className="w-3/12 flex flex-col justify-center mr-5">
                <RightWindow
                    meetingInfo={meetingInfo}
                    setMeetingInfo={setMeetingInfo}
                    chattingWindow={chattingWindow}
                    clipWindow={clipWindow}
                    scriptWindow={scriptWindow}
                    sendMessage={sendMessage}
                    moodId={moodId}
                    nickname={nickname}
                    sendImg={sendImg}
                />
            </div> : <></>
            }
        </div>
    );
}
