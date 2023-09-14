import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import moment from 'moment';
import { useParams, Link, useNavigate } from 'react-router-dom';
import boardResponseDto from 'dto/boardResponseDto';
import api from 'lib/api';
import Typography from '@mui/material/Typography';
import { Divider, Button, Select, MenuItem } from '@mui/material';
import Paging from './Paging';
import './styles/ListStyle.css';

function BoardList(): JSX.Element {
  const [boardList, setBoardList] = useState<boardResponseDto[] | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || '전체');
  const navigate = useNavigate();

  const fetchBoardList = async (page) => {
    try {
      console.log(`http://localhost:7777/api/board/page?page=${page}&category=${selectedCategory}`)
      const response = await api.get(`http://localhost:7777/api/board/page?page=${page}&category=${selectedCategory}`);
      const data = response.data;
      setStatus(data.statusCode)
      setBoardList(data.data.content);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.error('게시물 목록을 가져오는 중 오류 발생:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    // When the category is changed, navigate to the corresponding category route
    navigate(`/board/list/${newCategory}`);
  };

  useEffect(() => {
    // When the component mounts or the category changes, fetch the board list
    fetchBoardList(currentPage);
  }, [currentPage, selectedCategory,status]);

  useEffect(() => {
    setSelectedCategory(category || '전체');
  }, [category]);

  return (
    <>
      <Typography
        sx={{
          width: '100%',
          typography: 'h4',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'SDSamliphopangche_Basic',
          padding: 3,
        }}
      >
        우리 동네 게시판
      </Typography>
      <Divider />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 1rem', 
        }}
      >
        <Select
          labelId="select-category"
          id="select-category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="all">전체</MenuItem>
          <MenuItem value="walk-with">산책가요</MenuItem>
          <MenuItem value="show-off">동물자랑</MenuItem>
          <MenuItem value="sitter">시터공고</MenuItem>
        </Select>
        <Button variant="contained" sx={{ color: 'white' }}>
          <Link to={`/board/create`}>글쓰기</Link>
        </Button>
      </div>
      {boardList === null || status === 204? (
        <div className="crying-image-container">
          <img
            src="https://bys-petgoorm.s3.ap-northeast-2.amazonaws.com/pet-profile/202309112022_nbiuirc51.jpeg"
            alt="🥲"
            className="crying-image"
          />
          <p className="text-overlay">게시물이 없어요!</p>
        </div>
      ) : boardList.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className="board-table" aria-label="게시판 테이블">
            <TableHead sx={{ backgroundColor: '#FFAE8B', color: '#FFFFF' }}>
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
                  <TableCell>{moment(board.moddate).format('YYYY-MM-DD HH:mm')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Paging totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </TableContainer>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default BoardList;
