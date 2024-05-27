import { useRef } from "react";
import { motion } from "framer-motion";
import { BounceLoader } from "react-spinners";

/**
 * ChattingBox 컴포넌트는 채팅 UI를 렌더링합니다.
 * 
 * @component
 * @param {object} props - 컴포넌트에 전달되는 props
 * @param {object} props.meetingInfo - 회의 정보
 * @param {function} props.setMeetingInfo - 회의 정보를 설정하는 함수
 * @param {object} props.chattingWindow - 채팅창에 대한 ref
 * @param {function} props.sendMessage - 메시지를 보내는 함수
 * @param {string} props.moodId - 현재 사용자의 무드 ID
 * @param {string} props.nickname - 현재 사용자의 닉네임
 * @param {string} props.sendImg - 보내기 버튼의 이미지 경로
 */
function ChattingBox({ meetingInfo, setMeetingInfo, chattingWindow, sendMessage, moodId, nickname, sendImg }) {
  console.log(meetingInfo.chattingHistory);

  return (
    <div className="h-[80%] flex flex-col justify-between px-4">
      <div className="relative rounded-b-2xl h-[85%]">
        <div className="scroll-box bg-white rounded-2xl h-full overflow-y-scroll absolute w-full" ref={chattingWindow}>
          {meetingInfo.chattingHistory.map((elem, idx) => {
            if (elem.isLocal === 1) {
              return (
                <div key={idx} className="flex flex-row justify-end pl-8 pr-4 pt-4 w-full">
                  <div
                    style={{
                      backgroundColor: "#FEF8EC",
                      whiteSpace: "pre-line",
                      wordWrap: "break-word",
                    }}
                    className="py-2 pl-4 pr-4 rounded-tl-xl rounded-b-xl drop-shadow max-w-[90%]"
                  >
                    {elem.message}
                  </div>
                </div>
              );
            } else if (elem.isLocal === 2) {
              return (
                <div key={idx} className="flex flex-row justify-start pl-4 pr-8 pt-4 w-full">
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      whiteSpace: "pre-line",
                      wordWrap: "break-word",
                      border: "1px solid #E0E0E0",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    }}
                    className="py-2 pl-4 pr-4 rounded-tr-xl rounded-b-xl drop-shadow max-w-[90%]"
                  >
                    <div className="font-bold mb-1">AI 상담사</div>
                    {elem.message}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={idx} className="flex flex-row justify-start pl-4 pr-8 pt-4 w-full">
                  <div
                    style={{
                      backgroundColor: "#E0F4FF",
                      whiteSpace: "pre-line",
                      wordWrap: "break-word",
                    }}
                    className="py-2 pl-4 pr-4 rounded-tr-xl rounded-b-xl drop-shadow max-w-[90%]"
                  >
                    {elem.message}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const input = event.target.elements.message;
          if (input.value.trim().length !== 0) {
            const msg = input.value;
            sendMessage(
              JSON.stringify({
                cmd: "send chatting message",
                data: input.value,
              })
            );

            fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/meeting/chat`, {
              method: "post",
              headers: {
                Accept: "*/*", // 응답 데이터 타입
                "Content-Type": "application/json", // 콘텐츠 타입을 application/json으로 지정
              },
              body: JSON.stringify({
                moodId: moodId,
                nickname: nickname,
                meetingId: meetingInfo.meetingId,
                content: input.value,
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
          }
          input.value = "";
        }}
        className="mx-4 rounded-2xl h-[10%] flex flex-row"
      >
        <textarea
          name="message"
          className="bg-white w-full rounded-2xl resize-none scroll-box p-[3%]"
          disabled={meetingInfo.connect.dataChannel?.readyState !== "open"}
          onKeyUp={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              const input = event.target;
              if (input.value.trim().length !== 0) {
                const msg = input.value;
                sendMessage(
                  JSON.stringify({
                    cmd: "send chatting message",
                    data: input.value,
                  })
                );

                fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/meeting/chat`, {
                  method: "post",
                  headers: {
                    Accept: "*/*", // 응답 데이터 타입
                    "Content-Type": "application/json", // 콘텐츠 타입을 application/json으로 지정
                  },
                  body: JSON.stringify({
                    moodId: moodId,
                    nickname: nickname,
                    meetingId: meetingInfo.meetingId,
                    content: input.value,
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
                input.value = "";
              }
            }
          }}
        ></textarea>
        <button type="submit" className="ml-4 w-12 rounded-2xl flex flex-col justify-center items-center">
          <img src={sendImg} className="w-5/6 h-5/6 rounded-2xl" />
        </button>
      </form>
    </div>
  );
}

export default ChattingBox;
