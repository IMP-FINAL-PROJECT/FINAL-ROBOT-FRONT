import { motion } from "framer-motion";
import "./Video_Slide.css?after";
import { useQuery } from "@tanstack/react-query";
import useCounselStore from "../../stores/useCounselStore";
import { getVideoClip } from "../../services/videoServices";
import VideoLuffy from "../../assets/Luffy/VideoLuffy.png";
import Slider from "react-slick";

export default function Video_Slide() {
  const { counselId } = useCounselStore();
  const { data, isLoading } = useQuery({
    queryKey: ["pinedClip", counselId],
    queryFn: () => getVideoClip(counselId),
    refetchOnMount: true,
  });

  if (isLoading) {
    return (
      <div className="view skeleton border-2 rounded-[20px] px-[1.2vw] shadow-md h-[17vw]"></div>
    );
  }

  if (!data || data.pinnedclip.length === 0) {
    return (
      <div className="placeholder">
        <img src={VideoLuffy} alt="placeholder" />
        <p>상담기록에서 고정하세요!</p>
      </div>
    );
  }

  const videoList = data.pinnedclip.map(item => item.filepath);
  console.log(videoList.length);
  const settings = {
    dots: videoList.length > 1,
    infinite: videoList.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(videoList.length, 2),
          slidesToScroll: 1,
          infinite: videoList.length > 2,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <Slider {...settings} >
      {videoList.map((item, idx) => (
        <div key={idx} className="mt-5 card">
          <video
            preload="metadata"
            onClick={(event) => {
              event.preventDefault();
              const video = event.target;
              if (video.paused) video.play();
              else video.pause();
            }}
            src={`${item}#t=100`}
          />
        </div>
      ))}
    </Slider>
  );
}
