import MainLogo from "../../assets/MainLogo.svg";
import Luffys from "../../assets/Luffy/Luffys.svg";
import { motion } from "framer-motion";

const Intro = () => {
	const rand = Math.floor(Math.random() * 2);

	const containerMotion = {
		init: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
	};

	const itemMotion = {
		init: { opacity: 0 },
		visible: { opacity: 1 },
	};

	return (
		<>
			<motion.div className={`h-full  px-[5%] bg-beige`}>
				<motion.div
					className="h-full flex flex-col"
					variants={containerMotion}
					initial="init"
					animate="visible"
				>
					<motion.div variants={itemMotion} transition={{ duration: 2 }}>
						<>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						</>
					</motion.div>
					<motion.div
						className="text-[4vw] leading-[110%]"
						variants={itemMotion}
						transition={{ duration: 2 }}
					>
						{rand === 0 ? (
							<>
								뽀송뽀송한 기분으로 <br />
								러피를 키워보세요
							</>
						) : (
							<>
								러피와 함께하면 <br />
								기분이 뽀송뽀송
							</>
						)}
					</motion.div>
					<motion.div variants={itemMotion}></motion.div>
					<motion.div
						className="grow px-[10%] box-border flex justify-center"
						variants={itemMotion}
						transition={{ duration: 2 }}
					>
						<img src={rand === 0 ? Luffys : MainLogo} className="h-full" />
					</motion.div>
				</motion.div>
			</motion.div>
		</>
	);
};

export default Intro;
