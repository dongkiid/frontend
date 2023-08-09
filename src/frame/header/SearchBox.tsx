import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha, ThemeProvider } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export default function SearchBox(){

    return(
          <Search sx={{display: { xs: 'none', md: 'flex' }, marginRight: 2}}>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
    )
}


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 15,
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.5),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    fontFamily:'SDSamliphopangche_Basic',
    fontSize:20,
    color: '#404040',
    '& .MuiInputBase-input': {
      padding: theme.spacing(0.5, 1, 0.5, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
      },
    },
  }));
  
  