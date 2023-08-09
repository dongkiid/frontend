import { Box, Typography, Container} from "@mui/material";

export default function Calender() {
  return (
    <Container sx={{display:'flex', justifyContent:'center',
    background: 'linear-gradient(to bottom right, #FFAE8B 50%, #D6FFE8 50%);', marginBottom:10}}>
      <Box
        sx={{
          width: 200,
          height: 300,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
          display: 'flex', my:5, mx:1, boxShadow:'2px 2px 1px gray'
        }}
      />
      <Box sx={{
          width: 500,
          height: 300,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
          display: 'flex', my:5, boxShadow:'2px 2px 1px gray'
        }}/>
    </Container>
  )
}