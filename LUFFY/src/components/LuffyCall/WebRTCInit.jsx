import { useEffect, useState, useRef } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import * as tf from '@tensorflow/tfjs';
import userStore from "../../stores/useUserStore";
import useCounselStore from "../../stores/useCounselStore";
import instruction from "./GPT/systemScript";

let record = [];
let recordOption = {
    mimeType: "video/webm; codecs=vp9,opus",
    audioBitsPerSecond: 128000,
};
let firstSpeak = true;
let lastTime = null;
let meetingId2 = null;

const constraints = {
    video: true,
    audio: true,
};

const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json');

/**
 * WebRTC 및 WebSocket 초기화 컴포넌트
 */
export default function WebRTCInit({ setMeetingInfo, meetingInfo, handleRemoteChatting, handleNewClip, playGPTScript }) {
    const { moodId, nickname, userId } = userStore((state) => state);
    const { user1, user2, counselId, userInfos } = useCounselStore();
    const localCam = useRef();

    /**
     * 음성 인식 설정
     */
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            console.log(result);
            if (meetingInfo.video.local.volume == 0) return;
            const script = makeScriptAndSend(result);
            query({ inputs: result, options: { wait_for_model: true } })
                .then((response) => {
                    const sentimentResult = handleSentimentResponse(response, result);
                    const { text, isPositive, score } = sentimentResult;
                    console.log(isPositive, score);
                    if (!isPositive && score > 0.8) {
                        useGPT(script);
                    } else if (isPositive && score > 0.8) {
                        recordStopAndStart(meetingInfo, true, script, "긍정");
                    } else {
                        recordStopAndStart(meetingInfo, false);
                    }
                })
                .catch((error) => console.error(error));
        },
    });

    /**
     * 감정 분석 요청
     * @param {Object} data - 분석할 데이터
     */
    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/matthewburke/korean_sentiment",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    /**
     * 감정 분석 결과 처리
     * @param {Object} response - 분석 결과
     * @param {string} text - 입력 텍스트
     */
    function handleSentimentResponse(response, text) {
        const positiveScore = response[0].find((item) => item.label === "LABEL_1").score;
        const negativeScore = 1 - positiveScore;
        const isPositive = positiveScore > negativeScore;
        return { text, isPositive, score: isPositive ? positiveScore : negativeScore };
    }

    /**
     * 스크립트 생성 후 전송
     * @param {string} result - 음성 인식 결과
     */
    function makeScriptAndSend(result) {
        const script = {
            message: result,
            isLocal: 1,
            time: new Date(),
        };
        sendMessage(
            JSON.stringify({
                cmd: "script",
                data: script,
            })
        );
        console.log(result);
        const msg = result;
        sendMessage(
            JSON.stringify({
                cmd: "send chatting massage",
                data: result,
            })
        );
        fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/meeting/chat`, {
            method: "post",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                moodId: moodId,
                nickname: nickname,
                meetingId: meetingInfo.meetingId,
                content: result,
            }),
        }).catch((err) => {
            console.log(err);
        });

        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            newMeetingInfo.chattingHistory = [
                ...prevMeetingInfo.chattingHistory,
                {
                    isLocal: 1,
                    message: msg,
                },
            ];
            return newMeetingInfo;
        });

        script.isLocal = 0;
        return script;
    }

    /**
     * GPT 사용
     * @param {Object} script - 스크립트 객체
     */
    function useGPT(script) {
        setMeetingInfo((prevMeetingInfo) => {
            const newMeetingInfo = { ...prevMeetingInfo };
            const scriptHistory = newMeetingInfo.scriptHistory;
            scriptHistory.push(script);

            let partnerScript =
                scriptHistory.length >= 2 && scriptHistory[scriptHistory.length - 2].isLocal == 1
                    ? scriptHistory[scriptHistory.length - 2]
                    : null;
            console.log(partnerScript);
            if (partnerScript !== null) {
                console.log("use gpt");

                const myIndex = userId == userInfos[0].id ? 0 : 1;
                const partnerIndex = userId == userInfos[0].id ? 1 : 0;

                const messages = [
                    {
                        role: "system",
                        content: instruction,
                    },
                    {
                        role: "user",
                        content:
                            `${userInfos[partnerIndex].nickname} : ${partnerScript.message}. \n` +
                            `${userInfos[myIndex].nickname} : ${script.message}.`,
                    },
                ];
                console.log(messages);

                fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_APP_GPT_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        temperature: 0.5,
                        n: 1,
                        messages: messages,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("gpt return");
                        console.log(data);

                        const output = data.choices[0].message.content.split(":");

                        console.log(output);

                        if (JSON.parse(output[0]) == true) {
                            const gptMessage = output[1];

                            var gptScript = {
                                message: gptMessage,
                                isLocal: 2,
                                time: new Date(),
                                lastIndex: scriptHistory.length,
                            };
                            playGPTScript(gptScript);

                            setMeetingInfo((prevMeetingInfo) => {
                                const newMeetingInfo2 = { ...prevMeetingInfo };
                                newMeetingInfo2.scriptHistory.splice(scriptHistory.length, 0, gptScript);

                                newMeetingInfo2.chattingHistory.push({
                                    isLocal: 2,
                                    message: gptMessage,
                                });

                                newMeetingInfo2.showMessage = true;

                                sendMessage(
                                    JSON.stringify({
                                        cmd: "gptScript",
                                        data: gptScript,
                                    })
                                );

                                return newMeetingInfo2;
                            });

                            setTimeout(() => {
                                setMeetingInfo((prevMeetingInfo) => {
                                    const newMeetingInfo = { ...prevMeetingInfo };
                                    newMeetingInfo.showMessage = false;
                                    return newMeetingInfo;
                                });
                            }, 3000);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        recordStopAndStart(newMeetingInfo, false);
                    });
            }
            return newMeetingInfo;
        });
    }

    // Other functions like playGPTScript, recordStopAndStart, etc.

    // Component JSX
    return (
        <>
            {/* Your component JSX */}
        </>
    );
}
