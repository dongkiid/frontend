import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import {
  Stack,
  Popover,
  Checkbox,
  MenuItem,
  IconButton,
  FormControlLabel,
  Input,
  Button,
} from '@mui/material';

// components
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import api from "lib/api";

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default function TaskItem({ task, checked, onChange, onDelete }) {
  const [open, setOpen] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim() === '') {
      return; // 텍스트가 비어있으면 추가하지 않음
    }
    // 서버로 업데이트 요청을 보내는 코드를 여기에 추가
    api.put(`todo/${task.id}`, { title: editedTitle })
    .then((response) => {
      setIsEditing(false);
      onDelete();
    })
    .catch(error => {
      console.error('Update failed', error);
    });
  };

  const handleCheckboxChange = (event) => {
    const newCheckedValue = event.target.checked; // 변경된 상태 가져오기
    onChange(newCheckedValue); 

    if (task.title.trim() === '') {
      return; // 텍스트가 비어있으면 추가하지 않음
    }

    api.put(`todo/${task.id}`, { done: newCheckedValue, title:task.title  })
      .then((response) => {
        onDelete();
      })
      .catch(error => {
        console.error('Update failed', error);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log('DELETE', task.id);
    api.delete(`todo/${task.id}`) // 서버로 ToDo 항목 삭제 요청
      .then(() => {
        onDelete();
      })
      .catch(error => {
        console.log(error);
      });
  };

    return (
      <Stack
        direction="row"
        sx={{
          px: 2,
          py: 0.75,
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
{isEditing ? (
        <>
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={{ 
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid black',
              outline: 'none',
              flex: 1,
            }}
          />
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </>
      ) : (
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
          label={task.title}
          sx={{ flexGrow: 1, m: 0 }}
        />
)}
  
        <IconButton size="large" color="inherit" sx={{ opacity: 0.48 }} onClick={handleOpenMenu}>
          <MoreVertIcon />
        </IconButton>
  
        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 2 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>
      </Stack>
    );
};
