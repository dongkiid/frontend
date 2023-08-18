import { Box, Typography, Container} from "@mui/material";
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Calendar from 'components/todo/Calendar';

export default function Calender() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
  };

  if (selectedDate === null) {
    // selectedDate가 null일 때 초기값 설정
    setSelectedDate(dayjs());
  }

  return (
    <Container sx={{display:'flex', justifyContent:'center',
    background: 'linear-gradient(to bottom right, #FFAE8B 50%, #D6FFE8 50%);', marginBottom:10}}>
      <Box
        sx={{
          width: 200,
          height: 300,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
          display: 'flex', my:5, mx:1, boxShadow:'2px 2px 1px gray'
        }}
      />
      <Box
      sx={{
        width: 500,
        height: 300,
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
        display: 'flex',
        my: 5,
        boxShadow: '2px 2px 1px gray',
      }}
    >
      <Calendar onSelectDate={handleDateSelect} />
    </Box>
    </Container>
  );
}