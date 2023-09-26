import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import {
  Card,
  CardHeader,
} from '@mui/material';
// components
import TaskItem from "./TodoItem";
import TodoInput from './TodoInput';
import api from "lib/api";
import { useRecoilValue } from 'recoil';
import  selectedDateState  from "../../stores/seletedDate";

// ----------------------------------------------------------------------

AppTasks.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTasks({ title, list, ...other }) {
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ['2'],
    },
  });

  const [isAddingTodo, setIsAddingTodo] = useState(false); // 할 일 입력창을 표시할지 여부 상태 추가
  const [todos, setTodos] = useState([]);
  const selectedDate = useRecoilValue(selectedDateState);
  const [taskChecked, setTaskChecked] = useState([]);

  useEffect(() => {
    setTodos(list); // list가 변경될 때 todos 업데이트
  }, [list]);

  // 새로운 할 일 추가 함수
  const handleAddTodo = (newTodo) => {
    setTodos([...list, newTodo]);
    fetchTodos(selectedDate);
    setIsAddingTodo(false); // 입력창 닫기
  };

  const handleDeleteTodo = () => {
    fetchTodos(selectedDate);
  }

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

  return (
    <Card style={{ height: "460px", overflowY: 'auto' }}>

      <div style={{ display: 'flex'}}>
        <CardHeader title={title} />
        <button style={{ marginTop: "25px", fontSize: "20px", background: "white", borderRadius: "30px"}}
        onClick={() => setIsAddingTodo(true)}>+</button>
      </div>
      {isAddingTodo && (
        <TodoInput onAddTodo={handleAddTodo} />
      )}

      <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          const onSelected = (task) =>
            field.value.includes(task) ? field.value.filter((value) => value !== task) : [...field.value, task];

          return (
            <>
              {todos.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  checked={task.done}
                  onChange={() => field.onChange(onSelected(task.id))}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </>
          );
        }}
      />
    </Card>
  );
}
