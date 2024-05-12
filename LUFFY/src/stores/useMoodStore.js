import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initalState = {
	birth: null,
	gender: null,
	id: null,
	name: null,
};

const useMoodStore = create(
	persist(
		devtools((set) => ({
			...initalState,
			setMoodInfo: (birth,gender,id,name,) => {
				set(() => ({
                    birth,
                    gender,
                    id,
                    name,
				}));
			},
			reset: () => {
				set(initalState);
			},
		})),
		{
			name: "mood-store",
		}
	)
);

export default useMoodStore;
