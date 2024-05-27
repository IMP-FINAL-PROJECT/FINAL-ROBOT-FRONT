/**
 * 상담 ID를 기반으로 핀 고정된 비디오 클립을 가져옵니다.
 *
 * @async
 * @param {string} counselId - 상담 ID
 * @returns {Promise<Object>} - 핀 고정된 비디오 클립 데이터
 * @throws {Error} - 데이터 가져오기 실패 시 에러 발생
 */
export async function getVideoClip(counselId) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND_URL}/clip/pin/${counselId}`
  );

  if (!response.ok) {
    const error = new Error("에러가 발생하였습니다 다시 시도해주세요");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const pinedClip = await response.json();
  return pinedClip;
}
