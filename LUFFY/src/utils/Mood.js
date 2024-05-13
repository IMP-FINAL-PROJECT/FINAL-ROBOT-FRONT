import axios from 'axios';
import useMoodStore from '../stores/useMoodStore'; // useMoodStore를 정의한 파일의 경로를 적절하게 수정하세요.

export async function getAccessToken() {
    const id = useMoodStore.getState().id; // Zustand 스토어에서 id 가져오기

    try {
        const response = await axios.get(`${import.meta.env.VITE_MOOD_BACKEND_URL}/api/batch/id/${id}`);
        const token = (response.data.data.number).toString();
        console.log(token);
        return token;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
    }

    return;
}
