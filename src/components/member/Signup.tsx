import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactDaumPost from 'react-daumpost-hook';
import api from "lib/api";
import useNicknameChecker from "lib/useNicknameChecker";

interface FormData {
  email: string;
  memberName: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  address: string;
  phoneNumber: string;
}

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ mode: 'all' });
  const [addressForm, setAddressForm] = useState('');
  const navigate = useNavigate();
  const password = useRef<string>();
  password.current = watch("password");

  //타입스크립트의 타입추론 방법을 사용하여 interface에 타입 선언 x
  const [checkTF, setCheckTF] = useState({
    isAvailedEmail: false,
    isAvailedNickname: false
  });

    //양방향 바운딩을 위해 usestate로 닉넴 중복체크(한글만 마지막 글자 잘리는 오류 발생)
    const [inputNick, setInputNick] = useState('');

    const handleNickChange = (e) => {
      setInputNick(e.target.value);
    };


  //닉네임 중복확인 커스텀 훅 사용
  const { checkNickname, checkNick } = useNicknameChecker(inputNick);


  const handleFormSubmit = (data: FormData) => {
    if (checkTF.isAvailedEmail === true && checkTF.isAvailedNickname === true) {
        api.post("member/signup", JSON.stringify(data))
        .then((res) => {
          console.log(data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate("/");
    } else {
      alert('아이디 또는 이메일 중복확인을 클릭해주세요.');
    }
  };

  const checkEmail = () => {
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    console.log("email "+email)
    if (email && email.length > 0) {
      api.get(`member/checkEmail?email=${email}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          alert('사용 가능한 이메일입니다.');
          setCheckTF({ isAvailedNickname: checkTF.isAvailedNickname, isAvailedEmail: true });
        } else {
          alert('이미 존재하는 이메일입니다.');
          setCheckTF({ isAvailedNickname: checkTF.isAvailedNickname, isAvailedEmail: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      alert('이메일을 입력해주세요.');
    }
  };


  const postConfig = {
    onComplete: (data) => {
      setAddressForm(data.jibunAddress);
      console.log(data.jibunAddress);
    }
  };
  const postCode = ReactDaumPost(postConfig);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h1>회원 가입</h1>
          이메일 :
          <input
            id="email"
            type="text"
            {...register("email", {
              required: true,
              pattern: {
                value: /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/,
                message: '올바르지 않은 이메일 형식입니다.'
              },
            })}
          />
          <button type="button" onClick={checkEmail} disabled={!!errors.email} >중복확인</button><br />

          {errors.email && errors.email?.type === 'pattern' && (
            <ErrorMessage error={errors.email} />
          )}

          이름 :
          <input
            type="text"
            {...register("memberName", {
              required: {
                value: true,
                message: '이름을 입력해주세요'
              },
              minLength: 2,
              maxLength: 20
            })}
          /><br />
          {errors.memberName && errors.memberName?.type === 'required' && (
            <ErrorMessage error={errors.memberName} />
          )}
          
          비밀번호 :
          <input
            type="password"
            {...register("password", {
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
          {errors.password && errors.password?.type === 'pattern' && (
            <ErrorMessage error={errors.password} />
          )}
          
          비밀번호 확인 :
          <input
            type="password"
            {...register("passwordCheck", {
              required: true,
              validate: value => value === password.current || "비밀번호가 일치하지 않습니다."
            })}
          /><br/>
          {errors.passwordCheck && errors.passwordCheck?.type === 'validate' && (
            <ErrorMessage error={errors.passwordCheck} />
          )}

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
          onChange={handleNickChange}/>
          <button type="button" onClick={checkNickname} disabled={!!errors.nickname}>중복확인</button><br />
          {errors.nickname && errors.nickname?.type === 'pattern' && (
            <ErrorMessage error={errors.nickname} />
          )}
          주소 :
          <input
            id="address"
            type="text"
            onClick={postCode}
            value={addressForm}
            {...register("address", {
              required: {
                value: true,
                message: '주소를 입력해주세요'
              }
            })}
          />
          <button type="button" onClick={postCode} >주소 찾기</button><br />
          {errors.address && errors.address?.type === 'required' && (
            <ErrorMessage error={errors.address} />
          )}

          핸드폰 번호 :
          <input
            type="text"
            maxLength={11} 
            {...register("phoneNumber", {
              required: {
                value: true,
                message: '핸드폰 번호를 입력해주세요.'
              },
              pattern: {
                value: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
                message: '공백 없이 숫자만 입력해주세요.'
              }
            })}
          /><br />
          {errors.phoneNumber && (errors.phoneNumber?.type === 'required'|| 'pattern') && (
            <ErrorMessage error={errors.phoneNumber} />
          )}

          <p><button type="submit">가입하기</button></p>
        </form>
      </div>
    </>
  );
};

export default Signup;


export const ErrorMessage = ({ error }) => (
    error && (
      <div>
        <span>
          {error.message}
        </span>
      </div>
    )
  );
  