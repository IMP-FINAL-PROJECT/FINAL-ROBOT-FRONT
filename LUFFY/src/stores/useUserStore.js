import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initalState = {
	moodId: null,
	nickname: null,
	userId: null,
	email: null,
	birthday: null,
};

const useUserStore = create(
	persist(
		devtools((set) => ({
			...initalState,
			setUserInfo: (moodId, nickname, userId, email, birthday) => {
				set(() => ({
					moodId,
					nickname,
					userId,
					email,
					birthday,
				}));
			},
			reset: () => {
				set(initalState);
			},
		})),
		{
			name: "user-store",
		}
	)
);

export default useUserStore;
