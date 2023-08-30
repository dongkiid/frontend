import {useEffect} from 'react'
import Cookies from 'js-cookie';
import api from 'lib/api';

export default function Logout(){
    const accessToken = Cookies.get('key');

    useEffect(() => {
        if (accessToken) {
            api.post("member/logout", null)
            .then((res)=>{
                Cookies.remove('key');
                alert('로그아웃 성공!')
                return window.location.replace('/');
            }).catch((e)=>{
                console.log(e)
            })
        } 

      }, [accessToken]);
    
}