import Grid from '@mui/material/Grid';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Container } from '@mui/material';

const cards = [1, 2, 3];

export default function BoardList() {

    return (
        <Container>
            <Typography gutterBottom variant="h4" sx={{
                marginBottom: 7,
                textShadow: '4px 4px 0px rgba(255, 209, 175, 0)', color: 'black', fontFamily: 'SDSamliphopangche_Outline'
            }}>Today's</Typography>
            <Grid container spacing={6} sx={{ display: 'flex', zIndex: 'tooltip', position: 'relative' }}>
                {cards.map(card => (
                    <Grid item key={card} xs={4}>
                        <Card sx={{
                            height: 300, boxShadow: "10px 10px 0px #FFAE8B", border: 1, borderColor: 'secondary.main',
                            borderRadius: 10
                        }} >
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://src.hidoc.co.kr/image/lib/2022/5/12/1652337370806_0.jpg"
                                title="Image title"
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="h2">
                                    제목
                                </Typography>
                                <Typography>
                                    내용
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="secondary" sx={{
                                    backgroundColor: "transparent",
                                    '&:hover': {
                                        color: 'primary.main',
                                        backgroundColor: "transparent"
                                    }
                                    }}>
                                    <Typography sx={{
                                        '&:hover': {
                                            color: 'primary.main',
                                            backgroundColor: "transparent"
                                        }
                                    }}>글 보러가기</Typography>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                ))}
            </Grid>
        </Container>
    );
}
