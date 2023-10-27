import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useParams, useNavigate } from 'react-router-dom';
import boardResponseDto from 'dto/boardResponseDto';
import api from 'lib/api';
import Cookies from 'js-cookie';
import { Button, TableContainer, Table, TableBody, TableCell, TableRow, Paper, Typography, Divider, Container, Box, Stack } from '@mui/material';
import Reply from './reply/Reply';

function BoardDetail(): JSX.Element {
  const [board, setBoard] = useState<boardResponseDto | null>();
  const { boardId } = useParams();
  const navigate = useNavigate();

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
    const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (shouldDelete) {
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
      }
      navigate(-2);
    }
  };

  const goBackToList = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  return (
    <div>
      <Container component="main" maxWidth="lg" >
        <Button component={Link} to={`/board/modify/${boardId}`} variant="contained">
          글 수정
        </Button>
        <Button variant="contained" onClick={handleDeleteSubmit}>
          글 삭제
        </Button>
        {board ? (
          <>
            <Box component={Paper} sx={{ border: '1px solid #DCDCDC', borderRadius: 5, }} >
              <TableContainer >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography sx={{ padding: 1, color: 'grey', display: 'flex', justifyContent: 'left' }}>
                          {moment(board.moddate).format('YYYY-MM-DD HH:mm')}
                        </Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'left', padding: 1 }}>[{(() => {
                          switch (board.category) {
                            case 'walk-with':
                              return '산책가요';
                            case 'show-off':
                              return '동물자랑';
                            case 'sitter':
                              return '시터공고';
                            default:
                              return board.category;
                          }
                        })()}] {board.title}
                        </Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'left', padding: 1 }}>
                          👤 {board.writerNickname}
                        </Typography>
                        <Divider sx={{ margin: 3 }} />
                        {board.image !== '' && <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                          <img src={board.image} alt={`${board.title}`} style={{ maxWidth: '100%' }} /></div>}
                        <Typography sx={{ display: 'flex', justifyContent: 'center', margin: 5 }}>
                          {board.content}
                        </Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'right', padding: 1 }}>
                          👀 {board.clickCnt}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Reply /> 


              </Box>

            </>
            ) : (
            <div>Loading...</div>
        )}
            <Button variant="contained" onClick={goBackToList}>
              목록으로 돌아가기
            </Button>
          </Container>
    </div>
  );
}

export default BoardDetail;