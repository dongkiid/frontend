import { useState, React, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import Cookies from 'js-cookie';
import api from 'lib/api';
import { Link } from 'react-router-dom';


// ----------------------------------------------------------------------

export default function AccountPopover({ isLoggedIn }) {

   const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const [petImg, setPetImg] = useState(null);

  useEffect(() => {
    handlePetUrl()
  }, [petImg])

  const settings = isLoggedIn
  ? [
    { label: "마이 페이지", href: "/member/mypage" },
    { label: "펫 등록", href: "/pet/petform" },
    { label: "펫 수정", href: "/pet/edit" },
    { label: "로그아웃", href: "/logout" }
  ]
  : [{ label: "로그인", href: "/login" },
  { label: "회원가입", href: "/signup" }
  ];
  

  //헤더 아바타에 들어갈 펫 이미지 
  const handlePetUrl = () => {
    if (Cookies.get("key")) {
      api.get("pet/petinfo")
        .then((res) => {
          console.log("res.data " + res.data.data.petUrl)
          setPetImg(res.data.data.petUrl);
        }).catch((error) => {
          api.post("member/reissue")
            .then((res) => {
              console.log("accesstoken" + res.data.data);
              Cookies.set("key", res.data.data);
              alert('토큰 재발급 성공');
            })
            .catch((err) => {
              alert('토큰 재발급 실패');
              console.log(err.message)
            })
          console.log(error.message)
        })
    }
  }
  console.log("isLoggedIn"+isLoggedIn)



  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.2),
            },
          }),
        }}
      >
        <Avatar alt="Remy Sharp" src={petImg} sx={{backgroundColor:'#FFAE8B' }}/>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {settings.map((option) => (
            <MenuItem key={option.label} component={Link} to={option.href} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

      </Popover>
    </>
  );
}
