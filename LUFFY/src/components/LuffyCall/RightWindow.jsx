import ChattingBox from "./ChattingBox";
import ClipBox from "./ClipBox";
import ScriptBox from "./GPT/ScriptBox";
import "./Meeting.css";

/**
 * RightWindow 컴포넌트는 채팅, 클립, 대본 기능을 제공하는 오른쪽 창입니다.
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
 * @param {object} props.clipWindow - 클립 창에 대한 ref
 * @param {object} props.scriptWindow - 대본 창에 대한 ref
 */
function RightWindow({
  meetingInfo,
  setMeetingInfo,
  chattingWindow,
  sendMessage,
  moodId,
  nickname,
  sendImg,
  clipWindow,
  scriptWindow
}) {
  // 오른쪽 창 내용을 결정하는 함수
  function rightWindow() {
    switch (meetingInfo.rightWindow) {
      case 0: // 채팅
        return (
          <ChattingBox
            meetingInfo={meetingInfo}
            setMeetingInfo={setMeetingInfo}
            chattingWindow={chattingWindow}
            sendMessage={sendMessage}
            moodId={moodId}
            nickname={nickname}
            sendImg={sendImg}
          />
        );

      case 1: // 클립
        return <ClipBox meetingInfo={meetingInfo} clipWindow={clipWindow} />;

      case 2: // 대본
        return <ScriptBox meetingInfo={meetingInfo} scriptWindow={scriptWindow} />;
    }
  }

  return (
    <div className="bg-pink h-[75%] m-2 rounded-2xl flex flex-col justify-evenly relative">
      <div className="bg-white mx-4 rounded-t-2xl h-[10%] flex">
        <button
          className={`w-1/3 h-full font-extrabold text-xl ${
            meetingInfo.rightWindow == 0 ? "text-cherry" : ""
          }`}
          disabled={meetingInfo.rightWindow == 0}
          onClick={() => {
            setMeetingInfo((prevMeetingInfo) => {
              const newMeetingInfo = { ...prevMeetingInfo };
              newMeetingInfo.rightWindow = 0;
              return newMeetingInfo;
            });
          }}
        >
          채팅
        </button>
        <button
          className={`w-1/3 h-full font-extrabold text-xl ${
            meetingInfo.rightWindow == 1 ? "text-cherry" : ""
          } ${meetingInfo.clipReceived && "blink-effect"}`}
          disabled={meetingInfo.rightWindow == 1}
          onClick={() => {
            setMeetingInfo((prevMeetingInfo) => {
              const newMeetingInfo = { ...prevMeetingInfo };
              newMeetingInfo.rightWindow = 1;
              return newMeetingInfo;
            });
          }}
        >
          클립
        </button>
        <button
          className={`w-1/3 h-full font-extrabold text-xl ${
            meetingInfo.rightWindow == 2 ? "text-cherry" : ""
          } ${meetingInfo.showMessage && "blink-effect"}`}
          disabled={meetingInfo.rightWindow == 2}
          onClick={() => {
            setMeetingInfo((prevMeetingInfo) => {
              const newMeetingInfo = { ...prevMeetingInfo };
              newMeetingInfo.rightWindow = 2;
              return newMeetingInfo;
            });
          }}
        >
          대본
        </button>
        {meetingInfo.showMessage && (
          <div className="absolute bottom-full right-12 translate-y-10">
            <div
              style={{
                backgroundColor: "#fcdeeb",
                whiteSpace: "pre-line",
                wordWrap: "break-word",
              }}
              className="py-2 pl-4 pr-4 rounded-t-xl rounded-bl-xl drop-shadow max-w-[90%]"
            >
              {meetingInfo.showMessageContent}
            </div>
          </div>
        )}
      </div>
      {rightWindow()}
    </div>
  );
}

export default RightWindow;
