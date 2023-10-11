import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "lib/api";
import useNicknameChecker from "lib/useNicknameChecker";
import { Container, Typography, Grid, TextField, Box, Link, Button, Paper, Card } from '@mui/material';

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
    if (checkNick) {
      api.patch("member/editnick", JSON.stringify(data))
        .then((res) => {
          console.log(data);
          console.log(res.data);
          if (res.data.statusCode == 200) {
            alert(res.data.message)
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      alert("닉네임 중복확인을 클릭해주세요.")
    }
  };



  return (

    <>
      <Container component="main" maxWidth="sm" sx={{ padding: 3 }}>

        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #DCDCDC', borderRadius: 5,
            padding: 4, backgroundColor: 'white'
          }}
        >
          <Typography variant="h4" sx={{ mb: 5 }}>
            닉네임 변경
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>

            <Grid container spacing={2}>

              <Grid item xs={12}>
                <Typography sx={{ color: '#969696' }}>현재 닉네임</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  size="small"
                  hiddenLabel
                  fullWidth
                  inputProps={
                    { readOnly: true, }
                  }
                  value="닉네임 들어올 곳"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ color: '#969696' }}>새 닉네임</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  type="text"
                  size="small"
                  id="nickname"
                  hiddenLabel
                  fullWidth
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
                  error={!!errors.nickname}
                  helperText={errors.nickname?.message}
                />
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={checkNickname} disabled={!!errors.nickname} variant="contained"
                  sx={{ backgroundColor: '#FFAE8B', boxShadow: 'none', paddingY: 1 }} >중복확인</Button>
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#FFAE8B', boxShadow: 'none', paddingY: 1, marginY: 3 }}
            >
              변경하기
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default EditNick;

