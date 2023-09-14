import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import boardRequestDto from 'dto/boardRequestDto'
import BoardImageUploader from 'components/board/boardImageUploader'
import { Table, TableContainer, TableRow, TableCell, MenuItem, FormControl, Select, TextField, Typography, Box, Button, Divider} from '@mui/material';

import api from 'lib/api';

function ModifyBoard(): JSX.Element {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const [boardData, setBoardData] = useState<boardRequestDto>({
    title: '',
    content: '',
    category: '',
    image: '',
  });

  const fetchBoard = async () => {
    try {
      const response = await api.get(`http://localhost:7777/api/board/${boardId}`);
      setBoardData(response.data.data);
    } catch (error) {
      console.error('게시물을 가져오는 중 오류 발생:', error);
    }
  };
  console.log(boardData)

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

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
    if (boardData.title === '' || boardData.content === '' || boardData.category === '') {
      alert('모든 항목을 입력해주세요.');
    } else {
      try {
        const response = await api.put(`http://localhost:7777/api/board/edit/${boardId}`, JSON.stringify(boardData));
        if (response.data.statusCode === 200) {
          alert('게시글이 성공적으로 수정되었습니다.');
          navigate(`/board/${response.data.data}`);
        } else {
          alert(`${response.data.message}`);
        }
      } catch (error) {
        console.error('게시글 수정 중 오류 발생:', error);
      }
    }
  };

  const handleGoback = (event) => {
    navigate(-2) //개선 해야함

  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography sx={{ width: '100%', typography: 'h4', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "SDSamliphopangche_Basic", padding: 3, backgroundColor: '#FFAE8B'}}>
        글 수정
      </Typography>
      <Divider />
      <TableContainer sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
  <Table sx={{ minWidth: 200, width: 1000 }}>
    <TableRow>
      <TableCell>카테고리</TableCell>
      <TableCell align="center">
        <FormControl sx={{ minWidth: 120 }} size="small">
          <Select labelId="demo-select-small-label" id="demo-select-small" name="category" value={boardData.category} onChange={handleInputChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
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
      <TableCell align="center">
      {boardData.image !== '' && <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                    <img src={boardData.image} alt={`${boardData.title}`} style={{ maxWidth: '100%' }} /></div>}
        <BoardImageUploader onImageUpload={handleImageUpload}/>
      </TableCell>
    </TableRow>
  </Table>
</TableContainer>

<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, mx: 0.5, color: 'white' }}>
        게시물 수정
</Button>
<Button variant="contained" sx={{ mt: 3, mb: 2, mx: 0.5, color: 'white' }} onClick={handleGoback}>
          목록으로 돌아가기
</Button>
    </form>
  );
}

export default ModifyBoard;
