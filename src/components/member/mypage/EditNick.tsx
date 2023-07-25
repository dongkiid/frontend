import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactDaumPost from 'react-daumpost-hook';
import api from "lib/api";
import { ErrorMessage } from "../Signup";
import useNicknameChecker from "lib/useNicknameChecker";

interface FormData {
  nickname: string;
}

const EditNick = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ mode: 'all' });
  const navigate = useNavigate();

  //양방향 바운딩을 위해 usestate로 닉넴 중복체크
  const [inputNick, setInputNick] = useState('');

  const handleChange = (e) => {
    setInputNick(e.target.value);
  };

  //닉네임 중복확인 커스텀 훅 사용
  const { checkNickname, checkNick } = useNicknameChecker(inputNick);

  const handleFormSubmit = (data: FormData) => {
    if(checkNick){
        api.patch("member/editnick", JSON.stringify(data))
        .then((res) => {
          console.log(data);
          console.log(res.data);
          if(res.data.statusCode == 200){
          alert(res.data.message)
          navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
        alert("닉네임 중복확인을 클릭해주세요.")
    }
  };

  

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h1>닉네임 변경</h1>

          닉네임 :
          <input 
            id="nickname"
            type="text"
            {...register("nickname", {
              required: {
                value: true,
                message: '닉네임을 입력해주세요'
              },
              pattern: {
                value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
                message: '닉네임은 영문, 숫자 또는 한글로 2자 이상 16자 이하만 가능합니다.'
              }
            })}
            onChange={handleChange}

         />
          <button type="button" onClick={checkNickname} disabled={!!errors.nickname}>중복확인</button><br />
          {errors.nickname && errors.nickname?.type === 'pattern' && (
            <ErrorMessage error={errors.nickname} />
          )}

          <p><button type="submit">변경하기</button></p>
        </form>
      </div>
    </>
  );
};

export default EditNick;

  