import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import PetImgUpload from 'components/pet/PetImgUpload';
import { useState } from 'react';


export default function BoardForm() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);

    const [category, setCategory] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    const handleSubmit = () => {

    }


    return (
        <>
            <Typography sx={{
                width: '100%', typography: 'h4', display: 'flex',
                flexDirection: 'column', alignItems: 'center', fontFamily: "SDSamliphopangche_Basic", padding: 3
            }}>
                글 작성
            </Typography>
            <Divider/>
            <TableContainer sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                <Table sx={{ minWidth: 200, width: 1000, }} >
                    <TableRow >
                        <TableCell  >카테고리</TableCell >
                        <TableCell align="center">
                            <FormControl sx={{ minWidth: 120 }} size="small" >
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={10}>산책가요</MenuItem>
                                    <MenuItem value={20}>동물자랑</MenuItem>
                                    <MenuItem value={30}>시터공고</MenuItem>
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell>제목</TableCell >
                        <TableCell align="center">
                            <TextField fullWidth size="small"
                                id="outlined-multiline-static" />
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell  >내용</TableCell >
                        <TableCell align="center">
                            <TextField fullWidth
                                id="outlined-multiline-static"
                                multiline
                                rows={10}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell  >사진 첨부</TableCell >
                        <TableCell align="center">
                            <PetImgUpload setImageFile={setImageFile} setFilename={setFileName} setFileType={setFileType} nowProfile={null} />

                        </TableCell>
                    </TableRow>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mx: 0.5, color: 'white' }}
                    onClick={handleSubmit}
                >
                    등록
                </Button>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mx: 0.5, color: 'white' }}
                    onClick={handleSubmit}
                >
                    수정
                </Button>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mx: 0.5, color: 'white' }}
                    onClick={handleSubmit}
                >
                    삭제
                </Button>
            </Box>
        </>
    )
}
