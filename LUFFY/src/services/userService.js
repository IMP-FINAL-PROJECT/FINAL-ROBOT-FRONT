
import { getAccessToken } from "../utils/Mood";
export async function checkByCode(code) {
	const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/user/code?code=${code}`);
	const resData = await res.json();

	if (!res.ok) {
		throw new Error("checkByCode Fetch Error occured!");
	}

	return resData;
}

export async function moodLoginFetch() {
	const token = await getAccessToken()
	const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/user/login`, {
		headers: {
			Authorization: token,
		},
	});
	const resData = await response.json();
	console.log(resData);

	if (!response.ok) {
		throw Error("login fetch Error");
	}

	return resData;
}

export async function userDeleteFetch({ userId, counselId }) {
	const res = await fetch(
		`${import.meta.env.VITE_APP_BACKEND_URL}/user/delete/${userId}/${counselId}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: getAccessToken(),
			},
		}
	);

	if (!res.ok) {
		new Error("userDelete Fetch Error");
	}

	return res;
}

export async function userModifyFetch({ formData }) {
	console.log(formData);
	const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/user/modifyUser`, {
		method: "PUT",
		headers: {
			Authorization: await getAccessToken(),
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});

	if (!res.ok) {
		throw new Error("user Modify Fetch Error");
	}

	return res;
}
