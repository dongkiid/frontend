import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from "./pages/Main";
import Diary from "./pages/Todo";

function App() {
  return (

    <div>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/todo" element={<Diary/>}/>

      </Routes>
    </div>
    
  );
}

export default App;
