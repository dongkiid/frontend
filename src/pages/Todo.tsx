import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import TodoList from 'components/todo/Todolist';
import Calendar from 'components/todo/Calendar';

const TodoContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const CalendarContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const TodoListContainer = styled.div`
  flex: 2;
  padding: 20px;
`;

export default function Todo() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
  };

  if (selectedDate === null) {
    // selectedDate가 null일 때 초기값 설정
    setSelectedDate(dayjs());
  }

  return (
    <>
    <Helmet>
        <title> 반려일지 | 펫구름 </title>
    </Helmet>

    <TodoContainer>
      <CalendarContainer>
        <Calendar onSelectDate={handleDateSelect} />
      </CalendarContainer>
      <TodoListContainer>
        <TodoList selectedDate={selectedDate} />
      </TodoListContainer>
    </TodoContainer>
    </>
  );
}
