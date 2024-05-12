import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initalState = {
	counselId: null,
	code: null,
	user1: null,
	user2: null,
	startdate: null,
	userInfos: null,
	question: null,
};

const useCounselStore = create(
	persist(
		devtools((set) => ({
			...initalState,
			setCounselInfo: (counselId, code, user1, user2, startdate, userInfos, question) => {
				set(() => ({
					counselId,
					code,
					user1,
					user2,
					startdate,
					userInfos,
					question,
				}));
			},
			reset: () => {
				set(initalState);
			},
		})),
		{ name: "counsel-store" }
	)
);

export default useCounselStore;
