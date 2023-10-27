import React, { useState, useEffect } from 'react';
import DiaryEditPopup from "./DiaryEdit";

import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  Link,
  Button,
  Card,
} from '@mui/material';
import api from 'lib/api';
import dayjs from 'dayjs';

interface Diarydata {
    day: string;
    diary: string;
    diaryId: number;
    food: string;
    poop: string;
    snack: string;
    walk: string;
    water: string;
};
  
export const Diary = () => {
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState<Diarydata>({
      day: '',
      diary: '',
      diaryId: 0,
      food: '',
      poop: '',
      snack: '',
      walk: '',
      water: '',
    });

    const [userInput, setUserInput] = useState<Diarydata>({
      day: selectedDay,
      diary: '',
      diaryId: 0,
      food: '',
      poop: '',
      snack: '',
      walk: '',
      water: '',
    });

  useEffect(() => {
    // 서버에서 데이터 가져오는 부분
    api.get(`petdiary/${selectedDay}`)
      .then((response) => {
        setData(response.data.data || null);
      })
      .catch((error) => {
        console.error('Failed to fetch data', error);
      });
    console.log(data);
  }, [selectedDay]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {

    console.log(userInput)
    
    api.post(`petdiary`, userInput)
      .then((response) => {
        setData(userInput || null);
        setUserInput({
          day: selectedDay,
          diary: '',
          diaryId: 0,
          food: '',
          poop: '',
          snack: '',
          walk: '',
          water: '',
        });
      })
      .catch((error) => {
        console.error('Failed to post data', error);
      });
    setIsEditMode(false);
  };

  const handleIncrementDay = () => {
    const nextDay = dayjs(selectedDay).add(1, 'day').format('YYYY-MM-DD');
    setSelectedDay(nextDay);
    setUserInput((prevUserInput) => ({ ...prevUserInput, day: nextDay }));
  };

  const handleDecrementDay = () => {
    const previousDay = dayjs(selectedDay).subtract(1, 'day').format('YYYY-MM-DD');
    setSelectedDay(previousDay);
    setUserInput((prevUserInput) => ({ ...prevUserInput, day: previousDay }));
  };

  const openEditPopup = () => {
    setIsEditing(true);
  };

  const closeEditPopup = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    const shouldDelete = window.confirm('삭제하시겠습니까?');
    const petdiaryId = data.diaryId;
    if (shouldDelete) {
      api.delete(`petdiary/${petdiaryId}`)
        .then((response) => {
          setData(null);
          setUserInput({
            day: selectedDay,
            diary: '',
            diaryId: 0,
            food: '',
            poop: '',
            snack: '',
            walk: '',
            water: '',
          });
        })
        .catch((error) => {
          console.error('Failed to delete data', error);
        });
    }
  };


  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          반려일지
        </Typography>
        <Grid container spacing={3}>
          <Container component="main" maxWidth="sm" sx={{ padding: 3 }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid #DCDCDC',
                borderRadius: 5,
                padding: 4,
                backgroundColor: 'white',
              }}
            >


              {isEditMode ? (
                // 데이터 편집 모드
                <>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                  {selectedDay}
                  </Typography>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>음식 🍚:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <TextField type="text"
                                    size="small"
                                    hiddenLabel
                                    fullWidth
                                    value={userInput.food}
                                    onChange={(e) => setUserInput({ ...userInput, food: e.target.value })}
                                    />
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>간식 🦴:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                    <TextField type="text"
                                    size="small"
                                    hiddenLabel
                                    fullWidth
                                    value={userInput.snack}
                                    onChange={(e) => setUserInput({ ...userInput, snack: e.target.value })}
                                    />
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>배변 💩:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                    <TextField type="text"
                                    size="small"
                                    hiddenLabel
                                    fullWidth
                                    value={userInput.poop}
                                    onChange={(e) => setUserInput({ ...userInput, poop: e.target.value })}
                                    />
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>산책 🐕:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                    <TextField type="text"
                                    size="small"
                                    hiddenLabel
                                    fullWidth
                                    value={userInput.walk}
                                    onChange={(e) => setUserInput({ ...userInput, walk: e.target.value })}
                                    />
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>물 💧:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                    <TextField type="text"
                                    size="small"
                                    hiddenLabel
                                    fullWidth
                                    value={userInput.water}
                                    onChange={(e) => setUserInput({ ...userInput, water: e.target.value })}
                                    />
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>일기 📖:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                    <TextField type="text"
                                    size="small"
                                    hiddenLabel
                                    fullWidth
                                    value={userInput.diary}
                                    onChange={(e) => setUserInput({ ...userInput, diary: e.target.value })}
                                    />
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#FFAE8B',
                      boxShadow: 'none',
                      paddingY: 1,
                      marginY: 3,
                    }}
                    onClick={handleSaveClick}
                  >
                    저장
                  </Button>
                </Box>
                </>
              ) : 
            data ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button sx={{ fontSize: '1.5rem', color: 'black'  }} onClick={handleDecrementDay}>&lt;</Button>
                <Typography variant="h5">
                  {selectedDay}
                </Typography>
                <Button sx={{ fontSize: '1.5rem', color: 'black'  }} onClick={handleIncrementDay}>&gt;</Button>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>음식 🍚:</Typography>
                </Grid>
                <Grid item xs={10}>
                  {data.food}
                </Grid>

                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>간식 🦴:</Typography>
                </Grid>
                <Grid item xs={10}>
                  {data.snack}  
                </Grid>

                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>배변 💩:</Typography>
                </Grid>
                <Grid item xs={10}>
                  {data.poop}
                </Grid>

                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>산책 🐕:</Typography>
                </Grid>
                <Grid item xs={10}>
                  {data.walk}
                </Grid>

                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>물 💧:</Typography>
                </Grid>
                <Grid item xs={10}>
                  {data.water}
                </Grid>

                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>일기 📖:</Typography>
                </Grid>
                <Grid item xs={10}>
                  {data.diary}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Button
                  component={Box}
                  variant="contained"
                  sx={{
                    backgroundColor: '#FFAE8B',
                    boxShadow: 'none',
                    paddingY: 1,
                    marginY: 3,
                    flexGrow: 1,
                  }}
                  onClick={openEditPopup}
                >
                  수정
                </Button>
                <Button
                  component={Box}
                  variant="contained"
                  sx={{
                    backgroundColor: 'red',
                    boxShadow: 'none',
                    paddingY: 1,
                    marginY: 3,
                    flexGrow: 1,
                  }}
                  onClick={handleDeleteClick}
                >
                  삭제
                </Button>
              </Grid>

              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button sx={{ fontSize: '1.5rem', color: 'black'  }} onClick={handleDecrementDay}>&lt;</Button>
                <Typography variant="h5">
                  {selectedDay}
                </Typography>
                <Button sx={{ fontSize: '1.5rem', color: 'black'  }} onClick={handleIncrementDay}>&gt;</Button>
              </Box>
                <Typography variant="h6" sx={{ mb: 2 }}>반려 일지가 없어요!</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#FFAE8B', boxShadow: 'none', paddingY: 1, marginY: 3 }} onClick={handleEditClick}>등록</Button>
              </Box>
            )}
            {isEditing && (
              <DiaryEditPopup
              open={isEditing}
              closeEditPopup={closeEditPopup}
              userInput={data}
              setUserInput={setData}
            />
            )}
            </Card>
          </Container>
        </Grid>
      </Container>
    </>
  );  
};
