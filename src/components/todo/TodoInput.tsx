import { useState } from 'react';
import api from "lib/api";
import { useRecoilValue } from 'recoil';
import  selectedDateState  from "../../stores/seletedDate";

function TodoInput({ onAddTodo }) {
  const [newTodoText, setNewTodoText] = useState(''); // 입력된 텍스트 상태 추가
  const selectedDate = useRecoilValue(selectedDateState);

  const handleInputChange = (e) => {
    setNewTodoText(e.target.value); // 입력된 텍스트 업데이트
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') {
      return; // 텍스트가 비어있으면 추가하지 않음
    }

    const newTodo = {
      title: newTodoText,
      day: selectedDate.format("YYYY-MM-DD"),
    };

    api.post("todo", newTodo) // 서버로 ToDo 항목 전송
      .then((response) => {
        const savedTodo = {
          id: response.data.data.id,
          title: response.data.data.title,
          done: response.data.data.done
        }; // 서버에서 저장된 ToDo 항목 정보를 받아옴
        onAddTodo(savedTodo); // 받아온 ToDo 항목을 부모 컴포넌트로 전달
        setNewTodoText(''); // 입력창 초기화
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
      marginLeft: '30px',
      marginRight: '20px',
    }}>
      <input
        type="text"
        placeholder="새로운 할 일을 입력하세요"
        value={newTodoText}
        onChange={handleInputChange}
        style={{ 
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid black',
          outline: 'none',
          flex: 1,
        }}
      />
      <button onClick={handleAddTodo}>추가</button>
    </div>
  );
}

export default TodoInput;