import { useState } from "react";
import { useForm } from "react-hook-form";

import api from "lib/api";
import PetImgUpload from "./PetImgUpload";
import { uploadS3 } from "lib/s3";
import { Container, Typography, Grid, TextField, Box, Link, Button, Card } from '@mui/material';

interface PetFormData {
    petname: string;
    age: number;
    type: string;
    weight: number;
    firstmet: string;
    file: File;
    petUrl: string
}

//현재 날짜(파일명을 위한)
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');


export const PetForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<PetFormData>({ mode: 'all' });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);


    const handleFormSubmit = async (data: PetFormData) => {
        const formData = new FormData();
        const extension = fileName.split(".").pop(); // 파일 확장자 추출
        console.log(Date.now)

        //현재날짜와 랜덤 문자열로 파일명 변경
        const fileName2 = `${year}${month}${day}${hours}${minutes}_${Math.random().toString(36).substr(2, 9)}.${extension}`; // 현재 날짜와 랜덤 문자열로 파일명 생성

        formData.append('file', imageFile);
        formData.append('name', fileName2);
        formData.append('type', fileType);

        console.log("formData " + formData.get('file'));

        //s3에 파일 업로드 및 링크 반환
        const petUrl = await uploadS3(formData)
        console.log("peturl " + petUrl)
        data.petUrl = petUrl;

        api.post("pet/petform", JSON.stringify(data))
            .then((res) => {

                alert("업로드 완료!");
                console.log(res.data);
                return window.location.replace('/');


            }).catch((err) => {
                console.log(err.message);

                alert("실패!");
            })

    }



    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ padding: 3 }}>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid #DCDCDC', borderRadius: 5,
                        padding: 4, backgroundColor: 'white'
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        펫 등록
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <PetImgUpload setImageFile={setImageFile} setFilename={setFileName} setFileType={setFileType} nowProfile={null} />
                                </Box>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ color: '#969696' }}>이름</Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField type="text"
                                    size="small"
                                    hiddenLabel
                                    fullWidth
                                    {...register("petname", {
                                        required: {
                                            value: true,
                                            message: '반려 동물의 이름을 입력해주세요'
                                        },
                                        minLength: 2,
                                        maxLength: 20
                                    })}
                                    error={!!errors.petname}
                                    helperText={errors.petname?.message}
                                />

                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ color: '#969696' }}>나이</Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    size="small"
                                    hiddenLabel
                                    fullWidth
                                    type="number"

                                    {...register("age", {
                                        required: {
                                            value: true,
                                            message: '반려 동물의 나이를 입력해주세요.(숫자만 입력가능)'
                                        },
                                    })}
                                    error={!!errors.age}
                                    helperText={errors.age?.message}
                                />
                            </Grid>

                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ color: '#969696' }}>종류</Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    size="small"
                                    hiddenLabel
                                    fullWidth
                                    type="text"
                                    {...register("type", {
                                        required: {
                                            value: true,
                                            message: '반려 동물의 종을 입력해주세요'
                                        },
                                        minLength: 2,
                                        maxLength: 20
                                    })}
                                    error={!!errors.type}
                                    helperText={errors.type?.message}
                                /></Grid>

                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ color: '#969696' }}>몸무게</Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    size="small"
                                    hiddenLabel
                                    fullWidth
                                    type="number"

                                    {...register("weight", {
                                        required: {
                                            value: true,
                                            message: '반려 동물의 몸무게를 입력해주세요.(숫자만 입력가능)'
                                        },
                                    })}
                                    error={!!errors.weight}
                                    helperText={errors.weight?.message}
                                />
                            </Grid>

                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ color: '#969696' }}>처음 만난 날</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    size="small"
                                    hiddenLabel
                                    fullWidth
                                    type="date"
                                    {...register("firstmet", {
                                        required: {
                                            value: true,
                                            message: '반려 동물과의 처음 만난 날을 입력해주세요'
                                        }
                                    })}
                                    error={!!errors.firstmet}
                                    helperText={errors.firstmet?.message}

                                /></Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ backgroundColor: '#FFAE8B', boxShadow: 'none', paddingY: 1, marginY: 3 }}
                        >
                            등록하기
                        </Button>
                    </Box>
                </Card>
            </Container>
        </>
    )


}

    ;
