import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from "./pages/Main";
import Diary from "./pages/Todo";
import SignUpPage from 'pages/SignUpPage';
import Header from 'frame/Header';
import LoginPage from 'pages/LoginPage';
import Cookies from 'js-cookie';
import {useState, useEffect} from 'react';
import Logout from 'components/member/Logout';
import PetFormPage from 'pages/PetFormPage';
import PetEditPage from 'pages/PetEditPage';
import MyPage from 'pages/MyPage';
import BoardListPage from './components/board/BoardList';
import BoardCreateForm from 'pages/BoardCreatePage'
import BoardModifyForm from 'pages/BoardModifyPage'
import BoardDetail from 'pages/BoardDetailPage'
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get('key')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (

    <div>
      <Header isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/todo" element={<Diary/>}/>
        <Route path='/member/signup' element={<SignUpPage/>}/>
        <Route path='/member/login' element={<LoginPage/>}/>
        <Route path='/member/logout' element={<Logout/>}/>
        <Route path='/pet/petform' element={<PetFormPage/>}/>
        <Route path='/pet/edit' element={<PetEditPage/>}/>
        <Route path='/member/mypage' element={<MyPage/>}/>
        <Route path='/board/list/:category' element={<BoardListPage/>}/>
        <Route path='/board/:boardId' element={<BoardDetail />} />
        <Route path='/board/create' element={<BoardCreateForm />} />
        <Route path='/board/modify/:boardId' element={<BoardModifyForm />} />
      </Routes>
    </div>
    
  );
}

export default App;
