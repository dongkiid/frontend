import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from "./pages/Main";
import Diary from "./pages/Todo";
import SignUpPage from 'pages/SignUpPage';
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
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

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
      <HelmetProvider>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </HelmetProvider>
    </div>
    
  );
}

export default App;
