import { useEffect, useState } from "react";
import {
  CalendarContainer,
  CalendarHeader,
  DateContainer,
  DateLabel,
  DayContainer,
  DateLabelButton,
} from "./styles";
import dayjs from "dayjs";
import { generateDate } from "./generateDate";
import { useRecoilState } from "recoil";
import Leftbutton from "./calenderLeft.png";
import Rightbutton from "./calenderRight.png";
import { Card } from "@mui/material";
import selectedDateState from "stores/seletedDate";
import api from "lib/api";

interface DateProps {
  currentMonth: boolean;
  date: dayjs.Dayjs;
}

export const Calendar = () => {
  const [date, setDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState); // 선택한 날짜 상태 추가
  const dates = ["일", "월", "화", "수", "목", "금", "토"];
  const [records, setRecords] = useState<DateProps[]>([]);
  const [todoCounts, setTodoCounts] = useState<{ [date: string]: number }>({});
  const [completedDates, setCompletedDates] = useState<{ [date: string]: boolean }>({});

  const prevMonth = () => {
    setDate((prev) => prev.add(-1, "month"));
  };

  const nextMonth = () => {
    setDate((prev) => prev.add(1, "month"));
  };

  const handleDateClick = (clickedDate: dayjs.Dayjs) => {
    setSelectedDate(clickedDate);
  };

  useEffect(() => {
    // 서버에서 TodoList 데이터 가져오기
    api.get(`todo`)
      .then((response) => {
        const todoList = response.data.data;
  
        // 각 날짜에 대한 Todo 갯수 계산
        const counts: { [date: string]: number } = {};
        const completed: { [date: string]: boolean } = {};
  
        todoList.forEach((todo) => {
          const todoDate = dayjs(todo.day).format("YYYY-MM-DD");
  
          if (counts[todoDate]) {
            counts[todoDate]++;
          } else {
            counts[todoDate] = 1;
          }
  
          // 해당 날짜의 모든 todo가 done: true인지 확인
          const isAllCompleted = todoList
            .filter((t) => t.day === todoDate) // 해당 날짜의 todo만 필터링
            .every((t) => t.done); // 모든 todo가 done: true인지 확인
  
          completed[todoDate] = isAllCompleted;
        });
  
        setTodoCounts(counts);
        setCompletedDates(completed);
      })
      .catch((error) => {
        console.error("Failed to fetch todoList data", error);
      });
  }, [selectedDate]);
  
  

  useEffect(() => {
    const arrayOfDate = generateDate(date);
    setRecords(arrayOfDate);
  }, [date]);

  return (
    <Card style={{ height: "460px" }}>
      <CalendarContainer>
        <CalendarHeader>
          <span>
            {date.year()}년 {date.month() < 9 ? `0${date.month() + 1}` : date.month() + 1}월
          </span>
          <img src={Leftbutton} alt="left" onClick={prevMonth} />
          <img src={Rightbutton} alt="right" onClick={nextMonth} />
        </CalendarHeader>
        <DateContainer>
          {dates.map((date, index) => (
            <div key={index}>{date}</div>
          ))}
        </DateContainer>
        <DayContainer>
          {records.map(({ date, currentMonth }) => {
            const isToday = date.isSame(dayjs(), "day");
            const isSelected = selectedDate?.isSame(date, "day"); // 클릭한 날짜와 현재 날짜 비교
            const todoCount = todoCounts[date.format("YYYY-MM-DD")] || 0;
            const isCompleted = completedDates[date.format("YYYY-MM-DD")] || false; // 해당 날짜의 완료 여부
  
            return (
              <div key = {date.format("YYYY-MM-DD")}>
                <DateLabel
                  key={date.format("YYYY-MM-DD")}
                  $currentMonth={currentMonth}
                  $isToday={isToday}
                  $isSelected={isSelected}
                  onClick={() => handleDateClick(date)}
                >
                  <DateLabelButton key={date.format("YYYY-MM-DD")} $isCompleted={isCompleted}>
                    {isCompleted ? null : todoCount}
                  </DateLabelButton>
                  {date.date()}
                </DateLabel>
              </div>
            );
          })}
        </DayContainer>
      </CalendarContainer>
    </Card>
  );
};