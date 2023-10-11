import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "lib/api";
import { Container, Typography, Grid, TextField, Box, Link, Button, Card } from '@mui/material';
// components
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
        if (res.data.statusCode == 200) {
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
            비밀번호 변경
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ color: '#969696' }}>현재 비밀번호</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  size="small"
                  hiddenLabel
                  fullWidth
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
                  error={!!errors.nowPW}
                  helperText={errors.nowPW?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ color: '#969696' }}>새 비밀번호</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  size="small"
                  hiddenLabel
                  fullWidth
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
                  error={!!errors.updatePW}
                  helperText={errors.updatePW?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ color: '#969696' }}>새 비밀번호 확인</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  size="small"
                  hiddenLabel
                  fullWidth
                  {...register("passwordCheck", {
                    required: true,
                    validate: value => value === updatePW.current || "비밀번호가 일치하지 않습니다."
                  })}
                  error={!!errors.passwordCheck}
                  helperText={errors.passwordCheck?.message}
                />
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

export default EditPw;

