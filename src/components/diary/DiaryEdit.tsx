import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import api from 'lib/api';

const DiaryEdit = ({ open, closeEditPopup, userInput, setUserInput}) => {
    const petdiaryId = userInput.diaryId;
    
    const handleSaveClick = () => {
        console.log(userInput);
        api.put(`petdiary/${petdiaryId}`, userInput)
          .then((response) => {
            closeEditPopup();
          })
          .catch((error) => {
            console.error('오류 발생', error);
          });
      };
  
  
    return (
      <Dialog open={open} onClose={closeEditPopup} maxWidth="sm" fullWidth>
      <DialogTitle>펫 다이어리 수정</DialogTitle>
      <div>   </div>
      <DialogContent>
        <TextField
          type="text"
          label="음식 🍚"
          defaultValue={userInput.food}
          onChange={(e) => setUserInput({ ...userInput, food: e.target.value })}
          fullWidth
        />
      </DialogContent>
      <DialogContent>
        <TextField
          type="text"
          label="간식 🦴"
          defaultValue={userInput.snack}
          onChange={(e) => setUserInput({ ...userInput, snack: e.target.value })}
          fullWidth
        />
      </DialogContent>
      <DialogContent>
        <TextField
          type="text"
          label="배변 💩"
          defaultValue={userInput.poop}
          onChange={(e) => setUserInput({ ...userInput, poop: e.target.value })}
          fullWidth
        />
      </DialogContent>
      <DialogContent>
        <TextField
          type="text"
          label="산책 🐕"
          defaultValue={userInput.walk}
          onChange={(e) => setUserInput({ ...userInput, walk: e.target.value })}
          fullWidth
        />
      </DialogContent>
      <DialogContent>
        <TextField
          type="text"
          label="물 💧"
          defaultValue={userInput.water}
          onChange={(e) => setUserInput({ ...userInput, water: e.target.value })}
          fullWidth
        />
      </DialogContent>
      <DialogContent>
        <TextField
          type="text"
          label="일기 📖"
          defaultValue={userInput.diary}
          onChange={(e) => setUserInput({ ...userInput, diary: e.target.value })}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveClick} color="primary">
          저장
        </Button>
        <Button onClick={closeEditPopup} color="primary">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiaryEdit;