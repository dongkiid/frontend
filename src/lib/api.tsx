import axios from 'axios'
import Cookies from 'js-cookie';

const api = axios.create({
	baseURL : 'http://localhost:7777/',
    headers: {
        "Content-Type": `application/json`,
      },
})

//로그인 된 상태일때 header에 인증토큰 추가하는 인터셉터
api.interceptors.request.use((config) => {
  const key = Cookies.get("key");

  if (key) {
    config.headers.Authorization = `Bearer ${key}`;
  }

  return config;
});


export default api