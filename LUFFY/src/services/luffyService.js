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
  
  export async function fetchExpLevel(counselId) {
    const response = await fetch(
      `${
        import.meta.env.VITE_APP_BACKEND_URL
      }/exp/getExpLevel?counselId=${counselId}`
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
  
  export async function fetchClipCnt(counselId) {
    const response = await fetch(
      `${
        import.meta.env.VITE_APP_BACKEND_URL
      }/clip/getCilpCnt?counselId=${counselId}`
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
  