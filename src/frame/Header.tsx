import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import api from 'lib/api';
import Cookies from 'js-cookie';
import logo from '../styles/img/edit_logo2.png';
import SearchBox from './header/SearchBox';

const pages = [
  { text: '홈', href: '/' },
  { text: '반려일지', href: '/todo' },
  { text: '우리동네', href: '/board/boardlist' }
]

function Header({ isLoggedIn }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [petImg, setPetImg] = React.useState<string | null>(null);

  useEffect(() => {
    handlePetUrl()
  }, [petImg])

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

  const settings = isLoggedIn
    ? [
      { label: "마이 페이지", href: "/member/mypage" },
      { label: "펫 등록", href: "/pet/petform" },
      { label: "펫 수정", href: "/pet/edit" },
      { label: "로그아웃", href: "/member/logout" }
    ]
    : [{ label: "로그인", href: "/member/login" },
    { label: "회원가입", href: "/member/signup" }
    ];


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

 

  return (
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', my:2}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: 'none', md: 'flex' },
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
            <Box
              component="img"
              sx={{ height: 60, mr: 6 }}
              alt="Logo"
              src={logo}
            />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
              >
                <MenuIcon sx={{color:'#FFAE8B'}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.text} onClick={handleCloseNavMenu} component={Link} to={page.href}>
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                letterSpacing: '.3rem',
              }}
            >             
              <Box
              component="img"
              sx={{ height: 60 }}
              alt="Logo"
              src={logo}
            />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.text}
                  onClick={handleCloseNavMenu}
                  href={page.href}
                  sx={{ display: 'block',
                  fontFamily:'SDSamliphopangche_Basic',
                  fontSize:20,
                  color:'#404040',
                  textAlign:'center',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor:"transparent"
                  }
                  }}
                >
                  {page.text}
                </Button>
              ))}
            </Box>

          <SearchBox/>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={petImg} 
                    sx={{ width: 45, height: 45, backgroundColor:'#FFAE8B' }}
                    />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.label} component={Link} to={setting.href} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  );
}

export default Header;
