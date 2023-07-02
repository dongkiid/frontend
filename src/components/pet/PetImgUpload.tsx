import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';

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
            <label>프로필 이미지 추가</label>
            <input type="file" id="profileImg" 
                accept=".jpg, .png, .jpeg, .JPG, .PNG, .JPEG" onChange={onUpload}/>
            {nowProfile ||imagePreview ? <ThumbnailContainer><PreviewPet src={imagePreview? imagePreview: nowProfile} /></ThumbnailContainer> : <div />}
            
        </div>
    )

}

const PreviewPet = styled.img`
    max-width: 100%;
    max-height: 100%;
`
const ThumbnailContainer = styled.div`
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
`;

