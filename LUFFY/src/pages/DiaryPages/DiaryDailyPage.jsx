import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import "./DiaryDailyPage.css";
import ChatModal from "../../components/Modal/ChatModal";
import MemoModal from "../../components/Modal/MemoModal";
import MemoImg from "../../assets/luffy_bg.png";
import chatImg from "../../assets/diary/chat.svg";
import useUserStore from "../../stores/useUserStore";
import useCounselStore from "../../stores/useCounselStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  dailyFetch,
  getMemoFetch,
  changePinFetch,
  deleteClipFetch,
} from "../../services/diaryService";
import Pin from "../../assets/diary/pin.svg?react";
import { queryClient } from "../../utils/query";
import Trash from "../../assets/diary/trash.svg?react";

const DiaryDailyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [scope, animate] = useAnimate();
  const navigate = useNavigate();
  let year = searchParams.get("year");
  let month = searchParams.get("month");
  let day = searchParams.get("day");
  const date = new Date(year, +month - 1, day);
  const dateFormat = dayjs(date).format("YYYY-MM-DD");

  const { moodId: myId } = useUserStore();
  const { startdate, counselId } = useCounselStore();

  // 채팅 기록 모달 ON, OFF
  const [openChatModal, setOpenChatModal] = useState(false);

  // 메모 모달 ON, OFF
  const [openMemoModal, setOpenMemoModal] = useState(false);

  // Modal에 전달할 채팅 기록
  const [chats, setChats] = useState([]);

  // memo 내용
  const [memo, setMemo] = useState("");

  /**
   * 선택한 채팅 기록을 표시하는 함수
   * @param {Array} selChats - 선택된 채팅 기록
   */
  function showChat(selChats) {
    setChats(selChats);
    setOpenChatModal(true);
  }

  /**
   * 채팅 모달을 닫는 함수
   */
  function closeChatModal() {
    setOpenChatModal(false);
  }

  /**
   * 메모 모달을 표시하는 함수
   */
  function showMemo() {
    setOpenMemoModal(true);
  }

  /**
   * 메모 모달을 닫는 함수
   */
  function closeMemoModal() {
    setOpenMemoModal(false);
  }

  /**
   * 월별 보기로 이동하는 함수
   */
  function moveToMonthly() {
    navigate({
      pathname: "/diary/month",
      search: `?year=${year}&month=${month}`,
    });
  }

  const { mutate: changePinMutate } = useMutation({
    mutationFn: changePinFetch,
    onMutate: async (data) => {
      const newMeetings = { meeting: meetings };
      newMeetings.meeting[data.mIdx].clips[data.cIdx].pinned = data.mode;

      await queryClient.cancelQueries({
        queryKey: ["meetings", year, month, day],
      });
      const prevMeetings = queryClient.getQueryData(["meetings", year, month, day]);
      queryClient.setQueryData(["meetings", year, month, day], newMeetings);

      return { prevMeetings };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pinedClip", counselId]);
    },

    onError: (error, data, context) => {
      queryClient.setQueryData(["meetings", year, month, day], context.prevMeetings);
    },
  });

  /**
   * 클립의 고정 상태를 토글하는 함수
   * @param {number} clipId - 클립 ID
   * @param {boolean} pinned - 클립의 고정 상태
   * @param {number} mIdx - 미팅 인덱스
   * @param {number} cIdx - 클립 인덱스
   */
  function togglePinned(clipId, pinned, mIdx, cIdx) {
    animate(`#pin${clipId}`, { x: [0, -5, 0], y: [0, 5, 0] }, { duration: 0.3 });
    changePinMutate({ clipId, mode: !pinned, mIdx, cIdx });
  }

  const { data: meetings } = useQuery({
    queryKey: ["meetings", year, month, day],
    queryFn: () => dailyFetch(counselId, dateFormat),
    staleTime: 60000,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.meeting;
    },
  });

  const { data: memoData } = useQuery({
    queryKey: ["memo", dateFormat],
    queryFn: () => getMemoFetch(counselId, dateFormat),
    staleTime: 0,
    select: (data) => {
      return data.memo;
    },
  });

  useEffect(() => {
    if (memoData) {
      setMemo(memoData.content);
    }
  }, [memoData]);

  /**
   * 메모 데이터를 설정하는 함수
   * @param {string} content - 메모 내용
   */
  function handleMemoData(content) {
    setMemo(content);
  }

  const { mutate: deleteClipMutate } = useMutation({
    mutationFn: deleteClipFetch,
    onMutate: async (data) => {
      const newMeetings = { meeting: meetings };
      newMeetings.meeting[data.mIdx].clips = [
        ...newMeetings.meeting[data.mIdx].clips.slice(0, data.cIdx),
        ...newMeetings.meeting[data.mIdx].clips.slice(data.cIdx + 1),
      ];
      await queryClient.cancelQueries({
        queryKey: ["meetings", year, month, day],
      });
      const prevMeetings = queryClient.getQueryData(["meetings", year, month, day]);

      queryClient.setQueryData(["meetings", year, month, day], newMeetings);

      return { prevMeetings };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["meetings", year, month, day], context.prevMeetings);
    },
  });

  /**
   * 클립을 삭제하는 함수
   * @param {number} clipId - 클립 ID
   * @param {number} mIdx - 미팅 인덱스
   * @param {number} cIdx - 클립 인덱스
   */
  function handelDeleteClip(clipId, mIdx, cIdx) {
    if (confirm("정말 삭제하시겠어요?")) {
      deleteClipMutate({ clipId, mIdx, cIdx });
    }
  }

  return (
    <>
      <div nav="/">
        <div
          className="flex flex-col  absolute h-[90%] ml-[0vw] mt-[2vw] w-[80%] items-center"
          ref={scope}
        >
          {/* 선택한 날짜와 며칠째인지 나오는 곳 */}
          <div className="me-auto">
            <motion.div
              className="text-[2vw] hover:cursor-pointer"
              onClick={moveToMonthly}
              whileHover={{ scale: 1.2, x: "10%", fontWeight: [100, 600] }}
              transition={{ duration: 0.2 }}
            >
              {"<<  "}
              {dayjs(date).format("YYYY년 MM월 DD일")}
            </motion.div>
            <span className="text-[1.5vw]">
                              {"당신의 긍정"}
                            </span>
          </div>

          {/* 미팅 타임라인, 채팅, 메모 */}
          <div className="grid grid-cols-3 w-full h-[90vh] gap-6">
            {/* 미팅 타임라인 */}
            <div className="me-auto relative col-span-2  h-[80vh] w-full mt-[3vh]">
              <motion.ul
                layout
                className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical  overflow-y-scroll h-full rmscroll"
              >
                {meetings &&
                  meetings.length > 0 &&
                  meetings.map((meeting, mIdx) => {
                    if (meeting.clips.length === 0 && meeting.chats.length === 0) {
                      return <Fragment key={meeting.id}></Fragment>;
                    }
                    return (
                      <li key={meeting.id} className="grid-cols-[10%_90%] col-span-2">
                        <div className="timeline-middle col-start-1">
                          <div className="rounded-full bg-[#fd8680] w-[1vw] h-[1vw]"></div>
                        </div>
                        <div className="timeline-end m-0 w-full" style={{ gridColumnStart: 2 }}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[1.5vw]">
                              {"상담  ("+dayjs(meeting.createdAt).format("A hh : mm")+")"}
                            </span>
                            <button
                              className="btn rounded-full bg-pink shadow-lg w-[9vw] grid grid-cols-[30%_70%] justify-between items-center"
                              onClick={() => showChat(meeting.chats)}
                            >
                              <img src={chatImg} alt="" className="w-[70%]" />
                              <span className="text-[0.8vw]">상담 노트</span>
                            </button>
                          </div>
                        
                          {meeting.clips.length > 0 && meeting.clips[0].id != 0 ? (
                            meeting.clips.map((clip, cIdx) => (
                              <div
                                key={clip.id}
                                className="h-1/3 mb-5 flex flex-col justify-center relative"
                              >
                                <div className="mt-[1vw] ">
                                  <div className="w-full flex felx-row text-[1.5vw] justify-between items-center">
                                    <div className="flex justify-start items-center">
                                      <Pin
                                        id={`pin${clip.id}`}
                                        onClick={() =>
                                          togglePinned(clip.id, clip.pinned, mIdx, cIdx)
                                        }
                                        className={`h-[1.5vw] hover:cursor-pointer ${
                                          clip.pinned ? "fill-[#fd8680]" : "fill-[#9D9D9D]"
                                        }`}
                                        onMouseEnter={() => {
                                          animate(
                                            `#pin${clip.id}`,
                                            { scale: 1.2 },
                                            { duration: 0.1 }
                                          );
                                        }}
                                        onMouseLeave={() => {
                                          animate(
                                            `#pin${clip.id}`,
                                            { scale: 1 },
                                            { duration: 0.1 }
                                          );
                                        }}
                                      ></Pin>
                                    </div>
                                    <div className=" h-[1.5vw] w-[1.5vw] ml-[5%]">
                                      <Trash
                                        className="fill-black h-full w-full hover:fill-cherry hover:cursor-pointer"
                                        onClick={() => handelDeleteClip(clip.id, mIdx, cIdx)}
                                      >
                                        삭제
                                      </Trash>
                                    </div>
                                  </div>
                                  <video
                                    preload="metadata"
                                    src={`${clip.filepath}#t=100`}
                                    controls
                                    className="h-full w-full bg-slate-400 skeleton mt-[2vh]"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      if (event.target.paused === false) {
                                        event.target.pause();
                                      } else {
                                        event.target.play();
                                      }
                                    }}
                                  />
                                </div>
                                <div className="absolute top-0 flex items-center h-full justify-end"></div>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="text-[2vw]">저장된 긍정이 없어요</div>
                            </>
                          )}
                        </div>
                        <hr className="bg-[#fd8680] col-start-1" />
                      </li>
                    );
                  })}
              </motion.ul>
            </div>

            {/* 메모 영역 */}
            <div className="flex justify-center items-center">
              <motion.div
                className="w-[15vw] relative hover:cursor-pointer"
                whileHover={{ scale: 1.2 }}
                onClick={showMemo}
              >
                <div className="max-w-full h-full grid grid-rows-6 justify-center absolute">
                  <div className="text-[1vw] text-center row-start-2 max-w-full">
                    <span>Memo</span>
                  </div>
                  <div
                    className="row-start-3 row-span-2 max-w-[17vw] w-[17vw] text-center  px-[4vw] text-[0.8vw]"
                    style={{
                      whiteSpace: "pre-line",
                      wordWrap: "break-word",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {memo || "작성된 메모가 없어요."}
                  </div>
                </div>
                <img className="w-full" src={MemoImg} alt="MemoImg" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openChatModal && (
          <ChatModal onClose={closeChatModal} myId={myId} chats={chats}></ChatModal>
        )}
        {openMemoModal && (
          <MemoModal
            onClose={closeMemoModal}
            memo={memo}
            handleMemoData={handleMemoData}
            counselId={counselId}
            date={dateFormat}
          ></MemoModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default DiaryDailyPage;
