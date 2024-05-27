/**
 * 상담 ID를 기반으로 경험치 타임라인 데이터를 가져옵니다.
 *
 * @async
 * @param {string} counselId - 상담 ID
 * @returns {Promise<Object>} - 경험치 타임라인 데이터
 * @throws {Error} - 데이터 가져오기 실패 시 에러 발생
 */
export async function fetchExpTimeLine(counselId) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND_URL}/exp?counselId=${counselId}`
  );

  if (!response.ok) {
    const error = new Error("에러가 발생하였습니다 다시 시도해주세요");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const expTimeLine = await response.json();
  return expTimeLine;
}

/**
 * 상담 ID를 기반으로 현재 경험치 레벨을 가져옵니다.
 *
 * @async
 * @param {string} counselId - 상담 ID
 * @returns {Promise<Object>} - 경험치 레벨 데이터
 * @throws {Error} - 데이터 가져오기 실패 시 에러 발생
 */
export async function fetchExpLevel(counselId) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND_URL}/exp/getExpLevel?counselId=${counselId}`
  );

  if (!response.ok) {
    const error = new Error("에러가 발생하였습니다 다시 시도해주세요");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const exp = await response.json();
  return exp;
}

/**
 * 상담 ID를 기반으로 클립 개수를 가져옵니다.
 *
 * @async
 * @param {string} counselId - 상담 ID
 * @returns {Promise<Object>} - 클립 개수 데이터
 * @throws {Error} - 데이터 가져오기 실패 시 에러 발생
 */
export async function fetchClipCnt(counselId) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND_URL}/clip/getCilpCnt?counselId=${counselId}`
  );

  if (!response.ok) {
    const error = new Error("에러가 발생하였습니다 다시 시도해주세요");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const clipCnt = await response.json();
  return clipCnt;
}

/**
 * 상담 ID를 기반으로 전체 회의 시간을 가져옵니다.
 *
 * @async
 * @param {string} counselId - 상담 ID
 * @returns {Promise<Object>} - 전체 회의 시간 데이터
 * @throws {Error} - 데이터 가져오기 실패 시 에러 발생
 */
export async function fetchMeetingSum(counselId) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND_URL}/meeting/sum/${counselId}`
  );

  if (!response.ok) {
    const error = new Error("에러가 발생하였습니다 다시 시도해주세요");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const meetingSum = await response.json();
  return meetingSum;
}
