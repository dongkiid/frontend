import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from "./pages/Main";
import Diary from "./pages/Todo";
import SignUpPage from 'pages/SignUpPage';
import Header from 'frame/Header';

function App() {
  return (

    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/todo" element={<Diary/>}/>
        <Route path='/member/signup' element={<SignUpPage/>}/>
      </Routes>
    </div>
    
  );
}

export default App;
