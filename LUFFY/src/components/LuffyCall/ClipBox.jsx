/**
 * ClipBox 컴포넌트는 회의 중 생성된 클립을 표시합니다.
 * 
 * @component
 * @param {object} props - 컴포넌트에 전달되는 props
 * @param {object} props.meetingInfo - 회의 정보
 * @param {object} props.clipWindow - 클립 창에 대한 ref
 */
function ClipBox({ meetingInfo, clipWindow }) {
	return (
	  <div className="h-[80%] flex flex-col mx-4 justify-between relative">
		<div
		  className="scroll-box bg-white rounded-2xl h-[100%] w-full overflow-y-scroll py-[5%] absolute"
		  ref={clipWindow}
		>
		  {meetingInfo.clipHistory.map((clip, idx) => {
			return (
			  <div key={idx} className="flex flex-col items-center my-4">
				<div>{clip.keyword}</div>
				<video
				  preload="metadata"
				  src={`${clip.url}#t=100`}
				  onClick={(event) => {
					event.preventDefault();
					if (event.target.paused) {
					  event.target.play();
					} else {
					  event.target.pause();
					}
				  }}
				></video>
			  </div>
			);
		  })}
		</div>
	  </div>
	);
  }
  
  export default ClipBox;
  