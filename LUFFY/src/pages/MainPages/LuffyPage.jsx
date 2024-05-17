import ModalRoute from "../../components/Modal/ModalRoute";
import LuffyImg from "../../components/Luffy/LuffyImg.jsx";
import Luffystatustest from "../../components/Luffy/Luffystatustest.jsx";
import LuffyExp from "../../components/Luffy/LuffyExp.jsx";

export default function LuffyPage() {
  return (
    <ModalRoute modalcss="h-[41vw] w-[65vw] rounded-[20px] bg-beige" isX={true}>
      <div
        id="Wrapper"
        className="grid grid-cols-12 gap-5 h-[35vw] mt-[4vw] mx-[2vw]"
      >
        <LuffyImg />
        <Luffystatustest />
        <LuffyExp />
      </div>
    </ModalRoute>
  );
}
