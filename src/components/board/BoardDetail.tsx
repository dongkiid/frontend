import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useParams,useNavigate } from 'react-router-dom';
import boardResponseDto from 'dto/boardResponseDto';
import api from 'lib/api';
import Cookies from 'js-cookie';
import { Button, TableContainer, Table, TableBody, TableCell, TableRow, Paper, Typography, Divider } from '@mui/material';

function BoardDetail(): JSX.Element {
  const [board, setBoard] = useState<boardResponseDto | null>();
  const { boardId } = useParams();
  const navigate = useNavigate()

  const fetchBoard = async () => {
    try {
      const response = await api.get(`http://localhost:7777/api/board/${boardId}`);
      setBoard(response.data.data);
    } catch (error) {
      console.error('게시물 목록을 가져오는 중 오류 발생:', error);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('key');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await api.delete(`http://localhost:7777/api/board/delete/${boardId}`, { headers });
    if (response.data.status === 200) {
      alert('게시글이 삭제되었습니다.');
    } else {
      alert(`${response.data.message}`);
      navigate(`/board`)
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  return (
    <div>
      <Button component={Link} to={`/board/modify/${boardId}`} variant="contained">
        글 수정
      </Button>
      <Button variant="contained" onClick={handleDeleteSubmit}>
        글 삭제
      </Button>
      {board ? (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography sx={{display: 'flex', justifyContent: 'center'}}>[{board.category}] {board.title}   
                    <Typography sx={{ color: 'grey' }}> {moment(board.moddate).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                  </Typography>
                  <Typography sx={{display: 'flex', justifyContent: 'center'}}> 작성자: {board.writerNickname}</Typography>
                  <Divider sx={{margin:3}}/>
                  {board.image !== '' && <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                    <img src={board.image} alt={`${board.title}`} style={{ maxWidth: '100%' }} /></div>}
                  <Typography sx={{display: 'flex', justifyContent: 'center', margin:5}}>{board.content}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>Loading...</div>
      )}

      <Button component={Link} to={`/board`} variant="contained">
        목록으로 돌아가기
      </Button>
    </div>
  );
}

export default BoardDetail;
