import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactDaumPost from 'react-daumpost-hook';
import api from "lib/api";
import { ErrorMessage } from "../Signup";

interface FormData {

  updatePW: string;
  passwordCheck: string;
  nowPW: string;

}

const EditPw = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ mode: 'all' });
  const navigate = useNavigate();
  const updatePW = useRef<string>();
  updatePW.current = watch("updatePW");

  const handleFormSubmit = (data: FormData) => {
        api.patch("member/editpw", JSON.stringify(data))
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
    
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h1>비밀번호 변경</h1>

          현재 비밀번호 :
          <input
            type="password"
            {...register("nowPW", {
              required: {
                value: true,
                message: '비밀번호를 입력해주세요'
              },
              pattern: {
                value: /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                message: '비밀번호는 8자 이상이어야 하며, 숫자 및 영어 소문자를 모두 포함해야 합니다.'
              }
            })}
          /><br />
          {errors.nowPW && errors.nowPW?.type === 'pattern' && (
            <ErrorMessage error={errors.nowPW} />
          )}
          
          바꿀 비밀번호 :
          <input
            type="password"
            {...register("updatePW", {
              required: {
                value: true,
                message: '비밀번호를 입력해주세요'
              },
              pattern: {
                value: /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                message: '비밀번호는 8자 이상이어야 하며, 숫자 및 영어 소문자를 모두 포함해야 합니다.'
              }
            })}
          /><br />
          {errors.updatePW && errors.updatePW?.type === 'pattern' && (
            <ErrorMessage error={errors.updatePW} />
          )}
          
          비밀번호 확인 :
          <input
            type="password"
            {...register("passwordCheck", {
              required: true,
              validate: value => value === updatePW.current || "비밀번호가 일치하지 않습니다."
            })}
          /><br/>
          {errors.passwordCheck && errors.passwordCheck?.type === 'validate' && (
            <ErrorMessage error={errors.passwordCheck} />
          )}



          <p><button type="submit">변경하기</button></p>
        </form>
      </div>
    </>
  );
};

export default EditPw;

  