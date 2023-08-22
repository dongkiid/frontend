import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import moment from 'moment';
import { Link } from "react-router-dom";
import boardResponseDto from 'dto/boardResponseDto';
import api from 'lib/api';
import Typography from '@mui/material/Typography';
import { Divider,Button } from '@mui/material';

function BoardList(): JSX.Element {
  const [boardList, setBoardList] = useState<boardResponseDto[] | null>(null); // Initialize as null

  const fetchBoardList = async () => {
    try {
      const response = await api.get(`http://localhost:7777/api/board/list`);
      setBoardList(response.data.data);
    } catch (error) {
      console.error('게시물 목록을 가져오는 중 오류 발생:', error);
    }
  };
  
  useEffect(() => {
    fetchBoardList();
  }, []);

  return (
    <>
      <Typography sx={{
        width: '100%', typography: 'h4', display: 'flex',
        flexDirection: 'column', alignItems: 'center', fontFamily: "SDSamliphopangche_Basic", padding: 3
      }}>
        우리 동네 게시판
      </Typography>
      <Divider />
      <Button variant="contained" sx={{ mt: 3, mb: 2, mx: 0.5, color: 'white' }}>
        <Link to={`/board/create`}>글쓰기</Link>
      </Button>
      {boardList === null ? (
        <p>게시물이 없습니다.</p>
      ) : boardList.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className="board-table" aria-label="게시판 테이블">
            <TableHead sx={{backgroundColor: '#FFAE8B', color: '#FFFFF'}}>
              <TableRow>
                <TableCell>글번호</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>작성자</TableCell>
                <TableCell>등록일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {boardList.map((board) => (
                <TableRow key={board.boardId}>
                  <TableCell>{board.boardId}</TableCell>
                  <TableCell component="th" scope="row" className="title">
                    <Link to={`/board/${board.boardId}`}>{board.title}</Link>
                  </TableCell>
                  <TableCell>{board.writerNickname}</TableCell>
                  <TableCell>{moment(board.moddate).format("YYYY-MM-DD HH:mm")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress /> // 로딩 중인 경우
      )}
    </>
  );
}

export default BoardList;
