import { useState } from "react";
import Cookies from 'js-cookie';
import api from "lib/api";

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
                        Cookies.set ("key", res.data.data.accessToken);
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

            <div className="loginform">
                <div className="title">
                    <h1>로그인</h1>
                </div>
                <div className="email">
                    이메일 : <input name="email" type="text" value={inputValue.email} onChange={onChangeHandler} /><br />
                </div>
                <div className="pw">
                    비밀번호 : <input name="password" type="password" value={inputValue.password} onChange={onChangeHandler} /><br />
                </div>
                <div className="login">
                    <p><button className="btn" onClick={handleSubmit}>로그인</button></p>
                </div>
            </div>

        </>
    )
}

export default Login;