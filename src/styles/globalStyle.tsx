import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#FFAE8B"
        },
        secondary: {
            main: "#767676"
        },
        error: {
            main: "#DA1E28"
        },
        background: {
            default: "#ffffff"
          }
    },
    typography: {
        fontFamily: [ "NanumBarunGothic","SDSamliphopangche_Basic","SDSamliphopangche_Outline","Noto Sans KR", "sans-serif", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"].join(",")
        ,
        allVariants: {
            color: '#404040'
          }
    },
   components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'SDSamliphopangche_Basic';
          font-display: swap;
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Basic.woff') format('woff');
        };
        @font-face {
            font-family: 'SDSamliphopangche_Outline';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        };
        
      `,
    },
    
}
});


export default theme;