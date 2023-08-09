import { Box, Container } from '@mui/material';
import BoardList from 'components/main/BoardList';
import Calender from 'components/main/Calender';
import * as React from 'react';
import { styled } from 'styled-components';

const MainPage: React.FC = () => {
  return (
      <MainBox>
        <Calender />
        <BoardList />
      </MainBox>
  );
};

export default MainPage;


const MainBox = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '20rem'
});