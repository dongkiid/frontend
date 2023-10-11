import React, { useState } from "react";
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { IconButton } from '@mui/material';

const Input = styled('input')({
    display: 'none',
});


interface PetImgUploadProps {
    setImageFile: (file: File | null) => void;
    setFilename: (filename: string | null) => void;
    setFileType: (filename: string | null) => void;
    nowProfile: string | null
}


export default function PetImgUpload({ setImageFile, setFilename, setFileType, nowProfile }: PetImgUploadProps) {

    const [imagePreview, setImagePreview] = useState<string>("");


    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        // 이미지 파일 설정
        setImageFile(file);
        setFilename(file.name)
        setFileType(file.type)
        setImagePreview(URL.createObjectURL(file));
        // 파일 업로드 로직
    };

    return (
        <div>
            
            <label htmlFor="icon-button-file">
                <Input accept=".jpg, .png, .jpeg, .JPG, .PNG, .JPEG" id="icon-button-file" type="file" onChange={onUpload} />
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <Avatar sx={{ width: 200, height: 200 }} src={imagePreview} />
                </IconButton>
            </label>

        </div>
    )

}


