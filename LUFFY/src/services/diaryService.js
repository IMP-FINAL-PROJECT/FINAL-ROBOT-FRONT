/**
 * 상담 월별 미팅 데이터를 가져옵니다.
 *
 * @async
 * @param {string} counselId - 상담 ID
 * @param {string} yearMonth - 조회할 연월 (형식: YYYY-MM)
 * @returns {Promise<Object>} - 월별 미팅 데이터
 * @throws {Error} - 데이터 가져오기 실패 시 에러 발생
 */
export async function meetingFetch(counselId, yearMonth) {
  const res = await fetch(
    `${import.meta.env.VITE_APP_BACKEND_URL}/meeting/month?counselId=${counselId}&yearMonth=${yearMonth}`
  );

  const resData = await res.json();

  if (!res.ok) {
    throw new Error("MonthMeeting Fetch Error");
  }

  return resData;
}

/**
 * 상담 일별 데이터를 가져옵니다.
 *
 * @async
 * @param {string} counselId - 상담 ID
 * @param {string} date - 조회할 날짜 (형식: YYYY-MM-DD)
 * @returns {Promise<Object>} - 일별 데이터
 * @throws {Error} - 데이터 가져오기 실패 시 에러 발생
 */
export async function dailyFetch(counselId, date) {
  const res = await fetch(
    `${import.meta.env.VITE_APP_BACKEND_URL}/meeting/day?counselId=${counselId}&date=${date}`
  );

  const resData = await res.json();

  if (!res.ok) {
    throw new Error("Daily Fetch Error");
  }

  return resData;
}

/**
 * 메모 내용을 업데이트합니다.
 *
 * @async
 * @param {Object} params - 메모 업데이트 파라미터
 * @param {string} params.counselId - 상담 ID
 * @param {string} params.content - 메모 내용
 * @param {string} params.date - 메모 날짜 (형식: YYYY-MM-DD)
 * @returns {Promise<Object>} - 업데이트된 메모 데이터
 * @throws {Error} - 데이터 업데이트 실패 시 에러 발생
 */
export async function updateMemoFetch({ counselId, content, date }) {
  const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/memo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      counselId: counselId,
      content: content,
      date: date,
    }),
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new Error("Update Memo Fetch Error");
  }

  return resData;
}

/**
 * 특정 날짜의 메모를 가져옵니다.
 *
 * @async
 * @param {string} counselId - 상담 ID
 * @param {string} date - 조회할 날짜 (형식: YYYY-MM-DD)
 * @returns {Promise<Object>} - 메모 데이터
 * @throws {Error} - 데이터 가져오기 실패 시 에러 발생
 */
export async function getMemoFetch(counselId, date) {
  const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/memo/${counselId}/${date}`);

  const resData = await res.json();

  if (!res.ok) {
    throw new Error("Get Memo Fetch Error");
  }

  return resData;
}

/**
 * 클립의 핀 상태를 변경합니다.
 *
 * @async
 * @param {Object} data - 핀 상태 변경 파라미터
 * @param {string} data.clipId - 클립 ID
 * @param {string} data.mode - 핀 상태 (on 또는 off)
 * @returns {Promise<Object>} - 업데이트된 클립 데이터
 * @throws {Error} - 핀 상태 변경 실패 시 에러 발생
 */
export async function changePinFetch(data) {
  const res = await fetch(
    `${import.meta.env.VITE_APP_BACKEND_URL}/clip/pin/${data.clipId}/${data.mode}`,
    {
      method: "PUT",
    }
  );

  const resData = await res.json();

  if (!res.ok) {
    throw new Error("Change Pin Fetch Error");
  }

  return resData;
}

/**
 * 클립을 삭제합니다.
 *
 * @async
 * @param {Object} data - 삭제할 클립 데이터
 * @param {string} data.clipId - 클립 ID
 * @returns {Promise<Response>} - 삭제 결과
 * @throws {Error} - 클립 삭제 실패 시 에러 발생
 */
export async function deleteClipFetch(data) {
  const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/clip/${data.clipId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Delete Clip Fetch Error");
  }

  return res;
}
