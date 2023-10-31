import { useState } from 'react';
import api from "lib/api";

const useNicknameChecker = (nickname:string) => {
  const [checkNick, setCheckNick] = useState(false);

  const checkNickname = () => {
    if (nickname && nickname.length > 0) {
      api.get(`/member/checkNick?nickname=${nickname}`)
        .then((res) => {
          if (res.data.statusCode === 200) {
            alert('사용 가능한 닉네임입니다.');
            setCheckNick(true);
          } else {
            alert('이미 존재하는 닉네임입니다.');
            setCheckNick(false);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(nickname)
        });
    } else {
      alert('닉네임을 입력해주세요.');
    }
  };

  return { checkNickname, checkNick };
};

export default useNicknameChecker;
