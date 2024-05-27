import { getAccessToken } from "../utils/Mood";

/**
 * 주어진 코드로 사용자를 확인합니다.
 *
 * @async
 * @param {string} code - 확인할 코드
 * @returns {Promise<Object>} - 사용자 확인 결과 데이터
 * @throws {Error} - 데이터 가져오기 실패 시 에러 발생
 */
export async function checkByCode(code) {
  const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/user/code?code=${code}`);
  const resData = await res.json();

  if (!res.ok) {
    throw new Error("checkByCode Fetch Error occured!");
  }

  return resData;
}

/**
 * 사용자 로그인을 처리합니다.
 *
 * @async
 * @returns {Promise<Object>} - 로그인 결과 데이터
 * @throws {Error} - 로그인 실패 시 에러 발생
 */
export async function moodLoginFetch() {
  const token = await getAccessToken();
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

/**
 * 사용자를 삭제합니다.
 *
 * @async
 * @param {Object} params - 삭제할 사용자 정보
 * @param {string} params.userId - 사용자 ID
 * @param {string} params.counselId - 상담 ID
 * @returns {Promise<Response>} - 삭제 결과
 * @throws {Error} - 삭제 실패 시 에러 발생
 */
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

/**
 * 사용자를 수정합니다.
 *
 * @async
 * @param {Object} params - 수정할 사용자 정보
 * @param {Object} params.formData - 폼 데이터
 * @returns {Promise<Response>} - 수정 결과
 * @throws {Error} - 수정 실패 시 에러 발생
 */
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
