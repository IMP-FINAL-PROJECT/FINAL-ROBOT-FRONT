import { useEffect } from "react";

/**
 * WebSocket 및 WebRTC 연결 설정 컴포넌트
 */
export default function ConnectionSettings({ setMeetingInfo, meetingInfo, sendMessage, stop }) {
    const { counselId } = useCounselStore();

    /**
     * 연결 설정
     */
    const setConnection = function () {
        const conn = new WebSocket(`${import.meta.env.VITE_APP_SOCKET_URL}`);

        conn.onopen = function () {
            console.log("Connected to the signaling server");
            initialize();
            send({
                event: "access",
                data: JSON.stringify({
                    counselId: counselId,
                }),
            });
        };

        conn.onmessage = function (msg) {
            var content = JSON.parse(msg.data);
            var data = content.data;
            switch (content.event) {
                case "access":
                    console.log(data.meetingId);
                    handleAccess(data.meetingId);
                    break;
                case "request loading":
                    console.log("get request loading");
                    handleRequestLoading();
                    break;

                case "response loading":
                    console.log("get response loading");
                    handleResponseLoading();
                    break;

                case "offer":
                    handleOffer(data);
                    break;
                case "answer":
                    handleAnswer(data);
                    break;

                case "request prev state":
                    console.log("get request prev state");
                    handleRequestPrevState();
                    break;

                case "candidate":
                    handleCandidate(data);
                    break;

                case "getClipURL":
                    handleNewClip(data);
                    break;

                default:
                    break;
            }
        };

        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            newMeetingInfo.connect.conn = conn;
            return newMeetingInfo;
        });
    };

    // Initialize WebRTC connection
    const initialize = function () {
        const configuration = {
            iceServers: [
                { url: "stun:13.124.129.79:3478" },
                {
                    urls: "turn:13.124.129.79?transport=tcp",
                    credential: "1234",
                    username: "luffy",
                },
            ],
        };

        const peerConnection = new RTCPeerConnection(configuration);

        peerConnection.onicecandidate = function (event) {
            if (event.candidate) {
                send({
                    event: "candidate",
                    data: event.candidate,
                });
            }
        };

        peerConnection.oniceconnectionstatechange = function (event) {
            console.log("oniceconnectionstatechange");
        };

        const dataChannel = peerConnection.createDataChannel("dataChannel", {
            reliable: true,
        });

        dataChannel.onerror = function (error) {
            console.log("Error occured on datachannel:", error);
        };

        dataChannel.onmessage = function (event) {
            const msg = JSON.parse(event.data);
            console.log(msg);
            switch (msg.cmd) {
                case "request peer cam state":
                    sendMessage(
                        JSON.stringify({
                            cmd: "response peer cam state",
                            data: {
                                videoOn: meetingInfo.video.local.videoOn,
                                volume: meetingInfo.video.local.volume,
                            },
                        })
                    );
                    break;

                case "response peer cam state":
                    updateRemoteVideo(
                        msg.data.videoOn,
                        msg.data.volume,
                        meetingInfo.video.remote.volumeFactor,
                        true
                    );
                    break;

                case "send chatting massage":
                    handleRemoteChatting(msg.data);
                    break;

                case "script":
                    msg.data.time = new Date(msg.data.time);
                    setMeetingInfo((prevMeetingInfo) => {
                        console.log("got script");
                        const newMeetingInfo = { ...prevMeetingInfo };
                        newMeetingInfo.scriptHistory.push(msg.data);
                        return newMeetingInfo;
                    });
                    break;

                case "gptScript":
                    msg.data.time = new Date(msg.data.time);
                    playGPTScript(msg.data);
                    setMeetingInfo((prevMeetingInfo) => {
                        console.log("got gptScript");
                        const newMeetingInfo = { ...prevMeetingInfo };
                        newMeetingInfo.scriptHistory.splice(msg.data.lastIndex, 0, msg.data);
                        newMeetingInfo.chattingHistory.push({
                            isLocal: 2,
                            message: msg.data.message,
                        });
                        newMeetingInfo.showMessage = true;
                        return newMeetingInfo;
                    });
                    setTimeout(() => {
                        setMeetingInfo((prevMeetingInfo) => {
                            const newMeetingInfo = { ...prevMeetingInfo };
                            newMeetingInfo.showMessage = false;
                            return newMeetingInfo;
                        });
                    }, 3000);
                    break;
                default:
                    break;
            }
        };

        dataChannel.onclose = function () {
            updateRemoteVideo(false, 0, 0, true);
            stop();
            peerConnection.close();
            console.log("data channel is closed");
            setMeetingInfo((prevMeetingInfo) => {
                const newMeetingInfo = { ...prevMeetingInfo };

                newMeetingInfo.stream.remoteMediaStream.getTracks().forEach((track) => {
                    newMeetingInfo.stream.remoteMediaStream.removeTrack(track);
                });

                newMeetingInfo.video.remote.videoOn = false;
                newMeetingInfo.video.remote.volume = 0;

                newMeetingInfo.connect.prevOfferState = 0;
                newMeetingInfo.connect.offerState = 0;
                return newMeetingInfo;
            });

            initialize();
            meetingInfo.record = [];
        };

        peerConnection.ondatachannel = function (event) {
            console.log("ondatachannel");
            meetingInfo.connect.dataChannel = event.channel;
        };

        peerConnection.ontrack = function (event) {
            console.log("ontrack");
            meetingInfo.stream.remoteMediaStream.addTrack(event.track);

            if (meetingInfo.stream.remoteMediaStream.getTracks().length === 2) {
                console.log("ontrack record start");
                updateLocalVideo(
                    meetingInfo.video.local.videoOn,
                    meetingInfo.video.local.volume,
                    1
                );
                recordStopAndStart(meetingInfo, false);
                setMeetingInfo((prevMeetingInfo) => {
                    const newMeetingInfo = { ...prevMeetingInfo };
                    newMeetingInfo.connect.prevOfferState = prevMeetingInfo.connect.offerState;
                    newMeetingInfo.connect.offerState = 3;
                    return newMeetingInfo;
                });
            }

            sendMessage(
                JSON.stringify({
                    cmd: "request peer cam state",
                })
            );
        };

        peerConnection.onconnectionstatechange = function () {};

        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            newMeetingInfo.connect.peerConnection = peerConnection;
            newMeetingInfo.connect.dataChannel = dataChannel;
            return newMeetingInfo;
        });
    };

    const createOffer = function () {
        console.log("createOffer");
        meetingInfo.connect.peerConnection.createOffer(
            function (offer) {
                meetingInfo.connect.peerConnection.setLocalDescription(offer);

                send({
                    event: "offer",
                    data: offer,
                });
            },
            function () {
                alert("Error creating an offer");
            }
        );
        if (meetingInfo.connect.peerConnection.getSenders().length === 0) {
            meetingInfo.stream.localMediaStream.getTracks().forEach((track) => {
                meetingInfo.connect.peerConnection.addTrack(track);
            });
        }
        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            newMeetingInfo.connect.prevOfferState = prevMeetingInfo.connect.offerState;
            newMeetingInfo.connect.offerState = 2;
            return newMeetingInfo;
        });
    };

    const handleAccess = function (mId) {
        console.log("handleAccess");
        meetingId2 = mId;
        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            newMeetingInfo.connect.prevOfferState = prevMeetingInfo.connect.offerState;
            newMeetingInfo.connect.offerState = 1;
            newMeetingInfo.meetingId = mId;
            return newMeetingInfo;
        });
    };

    const handleRequestLoading = function () {
        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            newMeetingInfo.connect.prevOfferState = prevMeetingInfo.connect.offerState;
            newMeetingInfo.connect.offerState = 2;
            return newMeetingInfo;
        });
        send({
            event: "response loading",
        });
    };

    const handleResponseLoading = function () {
        createOffer();
    };

    const handleOffer = function (offer) {
        console.log("handleOffer");
        meetingInfo.connect.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

        meetingInfo.connect.peerConnection.createAnswer(
            function (answer) {
                meetingInfo.connect.peerConnection.setLocalDescription(answer);
                send({
                    event: "answer",
                    data: answer,
                });
            },
            function () {
                alert("Error creating an answer");
            }
        );
        if (meetingInfo.connect.peerConnection.getSenders().length === 0) {
            meetingInfo.stream.localMediaStream.getTracks().forEach((track) => {
                meetingInfo.connect.peerConnection.addTrack(track);
            });
        }
    };

    const handleAnswer = function (answer) {
        console.log("handleAnswer");
        meetingInfo.connect.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        send({
            event: "request prev state",
        });
    };

    const handleRequestPrevState = function () {
        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            if (prevMeetingInfo.connect.offerState !== 3) {
                newMeetingInfo.connect.offerState = prevMeetingInfo.connect.prevOfferState;
            }
            return newMeetingInfo;
        });
    };

    const handleCandidate = function (candidate) {
        console.log("handleCandidate");
        meetingInfo.connect.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    };

    const send = function (message) {
        meetingInfo.connect.conn.send(JSON.stringify(message));
    };

    useEffect(() => {
        return () => {
            if (meetingId2 !== null) endCall();
            meetingInfo.stream.localMediaStream.getTracks().forEach((track) => {
                track.stop();
                meetingInfo.stream.localMediaStream.removeTrack(track);
            });
        };
    }, []);

    return (
        <>
            {/* Your component JSX */}
        </>
    );
}
