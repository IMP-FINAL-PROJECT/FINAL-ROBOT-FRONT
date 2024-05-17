import LuffyTimeLine from "./LuffyTimeLine";

export default function LuffyExp() {
  return (
    <>
      <div id="LuffyHistory" className="col-span-4 h-[35vw]">
        <div className="flex flex-col items-center mt-[1.5vw]">
          <p className="text-[2vw] text-text-black font-bold">
            상담 내역
          </p>
          <ul
            id="LuffyTimeLine"
            className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical mt-[1vw] overflow-y-auto h-[30vw]"
          >
            <LuffyTimeLine />
          </ul>
        </div>
      </div>
    </>
  );
}
