import axios from 'axios'
import { LogoutApi } from 'components/member/Logout';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:7777/',
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

//인터셉터 -> api 요청시 response를 가로채서 미리 실행하는 도구
api.interceptors.response.use(
  (success) => success,
  async (error) => {
    const errorResponse = error.response.data;

    console.log(errorResponse);

    //만료된 access토큰일 경우(5001)
    if (errorResponse.statusCode === 5001) {
      try {
        const result = await api.post('member/reissue');
        console.log("accesstoken" + result.data.data);
        Cookies.set("key", result.data.data);
        console.log('토큰 재발급 성공');
        //토큰 재발급 후 중단된 api 다시 실행되게 리턴
        return api(error.config);

      } catch (error) {
        //reissue api에서 에러 발생시 refresh 토큰오류로 간주하고 강제 로그아웃
        console.log("reissue error "+error);
        Cookies.remove('key')
        window.location.replace('/');

      }

      return Promise.reject(error);
    } 
  }
);

export default api