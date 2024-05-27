import { useEffect, useRef, useState } from "react";
import ModalSave from "../Modal/ModalSave";
import StartRecord from "../../assets/StartRecord.svg";
import StopRecord from "../../assets/StopRecord.svg";
import useCounselStore from "../../stores/useCounselStore";
import useUserStore from "../../stores/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postVideoSave } from "../../services/quoteService";

const constraints = {
  audio: {
    echoCancellation: { exact: true },
  },
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
};

/**
 * 오늘의 명언 녹화 컴포넌트
 * @param {function} handleIsRecording - 녹화 상태 변경 핸들러
 * @param {function} handleClickIsquoteBoxOpen - 인용구 박스 열기 핸들러
 * @param {function} handleIsAnswered - 답변 완료 상태 핸들러
 */
export default function TodayRecoding({
  handleIsRecording,
  handleClickIsquoteBoxOpen,
  handleIsAnswered,
}) {
  const [mediaStream, setMediaStream] = useState(null);
  const [recordedBlob, setRecordedblob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const videoOutput = useRef(null);
  const recodeOutput = useRef(null);
  const { quote, counselId } = useCounselStore();
  const { moodId, nickname } = useUserStore();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postVideoSave,
    onSuccess: (data) => {
      alert("저장했습니다! 상담사의 답변을 기다려주세요!");
      closeModal();
      queryClient.invalidateQueries(["ansList", counselId]);
      handleClickIsquoteBoxOpen();
      handleIsAnswered();
    },
    onError: (error) => {
      alert("저장에 실패했어요. 다시 시도해주실래요?");
    },
  });

  /**
   * 미디어 스트림을 가져오는 함수
   */
  async function getMedia() {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    setMediaStream(stream);
    videoOutput.current.srcObject = stream;
    videoOutput.current.onloadedmetadata = () => {
      videoOutput.current.play();
    };
  }

  /**
   * 녹화를 시작하는 함수
   */
  const startRecoding = () => {
    setIsRecording(true);
    let mediaData = [];

    mediaRecorder.current = new MediaRecorder(mediaStream, {
      mimeType: "video/webm; codecs=vp9, opus",
    });

    mediaRecorder.current.ondataavailable = function (event) {
      if (event.data && event.data.size > 0) {
        mediaData.push(event.data);
      }
    };

    mediaRecorder.current.onstop = function () {
      const blob = new Blob(mediaData, { type: "video/webm" });
      const url = window.URL.createObjectURL(blob);
      setRecordedblob(blob);
      recodeOutput.current.src = url;
      recodeOutput.current.load();
      recodeOutput.current.oncanplaythrough = function () {
        recodeOutput.current.play();
      };
      recodeOutput.current.onended = function () {
        window.URL.revokeObjectURL(url);
      };
    };

    mediaRecorder.current.start();
  };

  /**
   * 녹화를 중지하는 함수
   */
  const stopRecoding = () => {
    setIsRecording(false);
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current = null;
      setModalOpen(true);
    }
  };

  /**
   * 모달을 닫는 함수
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  /**
   * 녹화된 비디오를 저장하는 함수
   */
  const videoSave = () => {
    if (confirm("영상을 저장할까요?")) {
      const answerDto = {
        moodId,
        quoteId: quote.id,
        counselId,
        nickname,
      };

      const formData = new FormData();
      formData.set("answerDto", JSON.stringify(answerDto));
      formData.set("answer", recordedBlob, "video.webm");
      mutate(formData);
    }
  };

  useEffect(() => {
    if (!mediaStream) {
      getMedia();
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  return (
    <>
      <div className="w-[35vw] mt-[2vw] flex flex-col items-center justify-center skeleton">
        <video
          className="rounded-t-[15px] w-full h-full"
          ref={videoOutput}
          id="video-output"
          muted
          autoPlay
          playsInline
        ></video>
        <div className="bg-pink rounded-b-[15px] shadow-md text-center py-[0.5vw] w-full">
          {isRecording ? (
            <button
              onClick={() => {
                handleIsRecording();
                stopRecoding();
              }}
              id="finish-btn"
            >
              <img src={StopRecord} alt="StopRecord" />
            </button>
          ) : (
            <button
              onClick={() => {
                handleIsRecording();
                startRecoding();
              }}
              id="start-btn"
            >
              <img src={StartRecord} alt="StartRecord" />
            </button>
          )}
        </div>
      </div>
      {modalOpen && (
        <ModalSave
          closeModalfun={closeModal}
          modalcss="w-[40vw] h-[30vw] rounded-[20px] bg-pink"
        >
          <div className="flex flex-col items-center">
            <div className="bg-white w-[30vw] h-[4vw] text-center leading-[4vw] text-[1vw] rounded-[35px] mt-[2vw] text-text-black">
              {quote ? "등록 하시겠습니까?" : "오늘의 명언"}
            </div>
            <div className="w-[30vw] h-[17vw] mt-[1.5vw] flex justify-center">
              <video
                ref={recodeOutput}
                preload="metadata"
                playsInline
                controls
                className="rounded-[20px] h-full"
              ></video>
            </div>
            <div className="w-[13vw] flex flex-row justify-between mt-[1vw]">
              <button
                onClick={closeModal}
                className="btn btn-sm bg-white border-[3px] border-cherry text-cherry rounded-[5px] hover:text-[#F5473E] hover:border-[#F5473E]"
              >
                취소
              </button>
              <button
                onClick={videoSave}
                className="btn btn-sm bg-cherry border-[3px] border-cherry text-white rounded-[5px] hover:bg-[#F5473E] hover:border-[#F5473E]"
              >
                저장
              </button>
            </div>
          </div>
        </ModalSave>
      )}
    </>
  );
}
