import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactDaumPost from 'react-daumpost-hook';
import api from "lib/api";
import useNicknameChecker from "lib/useNicknameChecker";
import { Button, TextField, Container } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Box, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import LogoImage from '../../styles/img/edit_logo2.png'
import { Link as RouterLink } from 'react-router-dom';

interface FormData {
  email: string;
  memberName: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  address: string;
  phoneNumber: string;
  bcode: string;
}

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<FormData>({ mode: 'all' });
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
    if (checkTF.isAvailedEmail === true && checkNick === true) {
      api.post("member/signup", JSON.stringify(data))
        .then((res) => {
          console.log(data);
          console.log(res.data);
          alert('회원가입 성공')
          navigate("/");

        })
        .catch((err) => {
          console.log(err);
          console.log(data)
          alert('회원가입 실패')

        });
    } else {
      alert('아이디 또는 이메일 중복확인을 클릭해주세요.');
    }
  };

  const checkEmail = () => {
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    console.log("email " + email)
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
      //address는 도로명(jibunAddresss는 없는 경우가 있어서 도로명으로 교체)
      //지역별 글 조회는 법정동코드(bcode)로 합쉬당
      setAddressForm(data.address);
      setValue("bcode", data.bcode)
      console.log("지번 " + data.jibunAddress);
      console.log("법정동코드" + data.bcode);
    }
  };
  const postCode = ReactDaumPost(postConfig);

  return (
    <>
      <div>
        <Container component="main" maxWidth="sm" sx={{ padding: 3 }}>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #DCDCDC', borderRadius: 5,
              padding: 4, backgroundColor: 'white'
            }}
          >
            <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
              <Box component="img" src={LogoImage} sx={{ height: 80, marginBottom: 3 }} />
            </Link>

            <Typography component="h1" variant="h5">
              회원가입
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#969696' }}>이메일</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    size="small"
                    hiddenLabel
                    name="email"
                    fullWidth
                    id="email"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/,
                        message: '올바르지 않은 이메일 형식입니다.'
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={checkEmail} disabled={!!errors.email} variant="contained"
                    sx={{ backgroundColor: '#FFAE8B', boxShadow: 'none', paddingY: 1 }} >중복확인</Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#969696' }}>비밀번호</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    size="small"
                    hiddenLabel
                    fullWidth
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
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ color: '#969696' }}>비밀번호 확인</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    size="small"
                    hiddenLabel
                    fullWidth
                    {...register("passwordCheck", {
                      required: true,
                      validate: value => value === password.current || "비밀번호가 일치하지 않습니다."
                    })}
                    error={!!errors.passwordCheck}
                    helperText={errors.passwordCheck?.message}
                  />
                </Grid>

                <Grid item xs={8}>
                  <Typography sx={{ color: '#969696' }}>닉네임</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ color: '#969696' }}>이름</Typography>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    size="small"
                    hiddenLabel
                    name="email"
                    fullWidth
                    id="nickname"
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
                    onChange={handleNickChange}
                    error={!!errors.nickname}
                    helperText={errors.nickname?.message}
                  />
                </Grid>
                <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={checkNickname} disabled={!!errors.nickname} variant="contained"
                    sx={{ backgroundColor: '#FFAE8B', boxShadow: 'none', paddingY: 1 }} >중복확인</Button>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    size="small"
                    hiddenLabel
                    fullWidth
                    {...register("memberName", {
                      required: {
                        value: true,
                        message: '이름을 입력해주세요'
                      },
                      pattern: {
                        value: /^(?=.*[a-z가-힣])[a-z가-힣]{2,16}$/,
                        message: '이름은 영문 또는 한글로 2자 이상 16자 이하만 가능합니다.'

                      }
                    })}
                    error={!!errors.memberName}
                    helperText={errors.memberName?.message}
                  />
                </Grid>


                <Grid item xs={12}>
                  <Typography sx={{ color: '#969696' }}>핸드폰번호</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    hiddenLabel
                    fullWidth
                    inputProps={{ maxLength: 11, inputMode: 'numeric', pattern: '[0-9]*' }}
                    type="text"

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
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#969696' }}>주소</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    hiddenLabel
                    fullWidth
                    type="text"
                    id="address"
                    onClick={postCode}
                    value={addressForm}
                    {...register("address", {
                      required: {
                        value: true,
                        message: '주소를 입력해주세요'
                      }
                    })}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />

                </Grid>
                <input
                  type="hidden"
                  {...register("bcode", {
                    required: true
                  })}
                />
                {errors.bcode && <span></span>}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ backgroundColor: '#FFAE8B', boxShadow: 'none', paddingY: 1, marginY: 3 }}
              >
                가입하기
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    이미 계정이 존재하시나요? 로그인
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Signup;
