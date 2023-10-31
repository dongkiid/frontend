import { useState } from "react";
import Cookies from 'js-cookie';
import api from "lib/api";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LogoImage from '../../styles/img/edit_logo2.png'
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {

    const [inputValue, setInputValue] = useState({
        email: '',
        password: ''
    });


    const onChangeHandler = (e) => {
        setInputValue((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value.trim() };
        })
    };

    const handleSubmit = () => {

        if (inputValue.email.trim() === "" || inputValue.password.trim() === "") {
            alert("아이디 또는 비밀번호를 입력해주세요");
        }
        else {
            api.post("member/login", JSON.stringify(inputValue))
                .then((res) => {
                    //console.log(res.data);
                    Cookies.set("key", res.data.data.accessToken);
                    alert('로그인 성공');
                    return window.location.replace('/');
                })
                .catch((err) => {
                    alert('아이디 또는 비밀번호 오류');
                })
        }
    }

    return (
        <>

            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?pet)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={3} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
                            <Box component="img" src={LogoImage} sx={{ height: 80, marginBottom: 3 }} />
                        </Link>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={inputValue.email} onChange={onChangeHandler}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={inputValue.password} onChange={onChangeHandler}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: 'white' }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        비밀번호 찾기
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"계정이 없으신가요? 회원가입"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

export default Login;