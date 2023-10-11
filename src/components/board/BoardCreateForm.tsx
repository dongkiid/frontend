import React, { useState } from 'react';
import { Table, TableContainer, TableRow, TableCell, MenuItem, FormControl, Select, TextField, Typography, Box, Button, Divider, Paper} from '@mui/material';
import BoardImageUploader from 'components/board/boardImageUploader'
import api from 'lib/api';
import boardRequestDto from 'dto/boardRequestDto';
import { useNavigate } from 'react-router-dom';

export default function BoardForm() {
  const navigate = useNavigate();
  
  const initialBoardData: boardRequestDto = {
    title: '',
    content: '',
    category: '',
    image: '',
  };

  const [boardData, setBoardData] = useState<boardRequestDto>(initialBoardData);
  const [category, setCategory] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBoardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setBoardData((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(boardData)
    if (boardData.title === '' || boardData.content === '' || boardData.category === '') {
      alert('모든 항목을 입력해주세요.');
    } else {
      const response = await api.post('http://localhost:7777/api/board/create', JSON.stringify(boardData));
      console.log(response);
      if (response.status === 200) {
        alert('게시글이 성공적으로 등록되었습니다.');
        navigate(`/board/${response.data.data}`);
      } else {
        alert('게시글 등록에 실패하였습니다.');
      }
    }
  };

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setBoardData((prevData) => ({
      ...prevData,
      category: selectedCategory,
    }));
  };

  const handleGoback = (event) => {
    navigate(-1)
  }

  return (
    <>
      <Typography sx={{ width: '100%', typography: 'h3', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: "SDSamliphopangche_Basic", padding: 3}}>
        글 작성
      </Typography>
      <Divider />
      <TableContainer sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
        <Table sx={{ minWidth: 200, width: 1000, backgroundColor:'white', border: '1px solid #DCDCDC', borderRadius: 5}}>
          <TableRow>
            <TableCell>카테고리</TableCell>
            <TableCell align="left">
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select labelId="demo-select-small-label" id="demo-select-small" value={category} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem value="">카테고리 선택</MenuItem>
                  <MenuItem value="walk-with">산책모임</MenuItem>
                  <MenuItem value="show-off">동물자랑</MenuItem>
                  <MenuItem value="sitter">시터공고</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>제목</TableCell>
            <TableCell align="center">
              <TextField fullWidth size="small" id="outlined-multiline-static" name="title" value={boardData.title} onChange={handleInputChange} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>내용</TableCell>
            <TableCell align="center">
              <TextField fullWidth id="outlined-multiline-static" multiline rows={10} name="content" value={boardData.content} onChange={handleInputChange} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>사진 첨부</TableCell>
            <TableCell align="left">
              <BoardImageUploader onImageUpload={handleImageUpload}/>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" sx={{ mt: 3, mb: 2, mx: 0.5, color: 'white' }} onClick={handleSubmit}>
          등록
        </Button>
        
        <Button variant="contained" sx={{ mt: 3, mb: 2, mx: 0.5, color: 'white' }} onClick={handleGoback}>
          목록으로 돌아가기
        </Button>
      </Box>
    </>
  );
}
