import React, { useState, useEffect } from 'react';
import api from "lib/api";
import dayjs, { Dayjs } from 'dayjs';

// ToDo 항목을 나타내는 인터페이스
interface Todo {
  id: number;
  title: string;
  day: String;
  done: boolean;
}

// TodoList 컴포넌트의 Props 타입 정의
type TodoListProps = {
  selectedDate: Dayjs | null; // 또는 원하는 타입으로 변경
};


const TodoList: React.FC<TodoListProps> = ({ selectedDate }) => {
  // ToDo 항목을 담을 상태
  const [todos, setTodos] = useState<Todo[]>([]);
  // 새로운 ToDo 항목의 텍스트를 담을 상태
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    if (selectedDate !== null) {
      fetchTodos(selectedDate);
    }
  }, [selectedDate]);

  // ToDo 리스트 조회 함수
  const fetchTodos = (selectedDate) => {
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    api.get(`todo/${formattedDate}`)
      .then(response => {
        setTodos(response.data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          done: item.done
        })));
      })
      .catch(error => {
        console.log(error);
      });
  };

  // ToDo 항목 추가 함수
  const addTodo = () => {
    if (newTodoText.trim() === '') {
      return; // 텍스트가 비어있으면 추가하지 않음
    }
    const newTodo: Todo = {
      id: 0, // 임시로 0으로 설정
      title: newTodoText,
      day: selectedDate.format("YYYY-MM-DD"),
      done: false,
    };

    console.log(newTodo)
    api.post("todo", newTodo) // 서버로 ToDo 항목 전송
      .then((response) => {
        console.log(response.data);
        const savedTodo = response.data.data; // 서버에서 저장된 ToDo 항목 정보를 받아옴
        setTodos([...todos, savedTodo]); // 받아온 ToDo 항목을 todos에 추가
        setNewTodoText('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // ToDo 항목 완료 처리 함수
const toggleTodo = (id: number) => {
  const updatedTodos = todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );

  const updatedTodo = updatedTodos.find(todo => todo.id === id);

  if (updatedTodo) {
    api
      .put(`todo/${id}`, updatedTodo) // PUT 요청을 보내도록 수정
      .then(() => {
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.log(error);
      });
  }
};


  // ToDo 항목 삭제 함수
  const deleteTodo = (id: number) => {
    api.delete(`todo/${id}`) // 서버로 ToDo 항목 삭제 요청
      .then(() => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>{selectedDate.format("YYYY년 MM월 DD일").toString()}의 TODO </h2>
      <input
        type="text"
        value={newTodoText}
        onChange={e => setNewTodoText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;