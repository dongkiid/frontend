import {useEffect} from 'react'
import Cookies from 'js-cookie';
import api from 'lib/api';

export default function Logout(){
    const accessToken = Cookies.get('key');

    useEffect(() => {
        if (accessToken) {
            LogoutApi()
        } 

      }, [accessToken]);
    
}

export const LogoutApi = async() =>{
    
    try{
        const result = await api.post('member/logout');
        Cookies.remove('key')
        alert('로그아웃 성공.')
        return window.location.replace('/');
      }catch(error){
        console.log(error);
      }
}