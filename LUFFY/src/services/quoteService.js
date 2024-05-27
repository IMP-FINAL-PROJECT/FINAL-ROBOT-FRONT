/**
 * 비디오를 저장하기 위해 서버에 POST 요청을 보냅니다.
 *
 * @async
 * @param {FormData} formData - 서버로 전송할 폼 데이터
 * @returns {Promise<void>} - 응답을 기다리지만 반환 값은 없음
 * @throws {Error} - 데이터 전송 실패 시 에러 발생
 */
export async function postVideoSave(formData) {
  console.log(formData);
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/qna`, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "*/*",
    },
  });

  if (!response.ok) {
    const error = new Error("에러가 발생하였습니다 다시 시도해주세요");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
}

/**
 * 상담 ID를 기반으로 답변 목록을 가져옵니다.
 *
 * @async
 * @param {string} counselId - 상담 ID
 * @returns {Promise<Object>} - 답변 목록 데이터
 * @throws {Error} - 데이터 가져오기 실패 시 에러 발생
 */
export async function getAnsList(counselId) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND_URL}/qna/getAns?counselId=${counselId}`
  );

  if (!response.ok) {
    const error = new Error("에러가 발생하였습니다 다시 시도해주세요");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const ansList = await response.json();
  return ansList;
}
