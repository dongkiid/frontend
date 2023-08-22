import { uploadS3 } from "lib/s3";
import React, { useState } from "react";
import { styled } from "styled-components";


// 파일과 관련된 요소들의 타입 정의
interface FileState {
  file: File | null;
  name: string | null;
  type: string | null;
}

interface ImageProps {
  onImageUpload: (imageUrl: string) => void;
}

export default function ExampleComponent({onImageUpload}:ImageProps): JSX.Element {
    //현재 날짜(파일명을 위한)
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  const [fileState, setFileState] = useState<FileState>({
    file: null,
    name: null,
    type: null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = async (event) => {
    const formData = new FormData();
    const file = event.target.files?.[0];
    const extension = file.name.split(".").pop();
  
    if (file) {
      const fileName = `${year}${month}${day}${hours}${minutes}_${Math.random().toString(36).substr(2, 9)}.${extension}`;
  
      formData.append("name", fileName);
      formData.append("file", file);
      formData.append("type", file.type);
  
      try {
        const imageURL: string = await uploadS3(formData);
        onImageUpload(imageURL);
        setImagePreview(URL.createObjectURL(file));
      } catch (error) {
        console.error("S3 업로드 에러:", error);
      }
    }
  };
  
 
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <input type="file" accept=".jpg, .png, .jpeg, .JPG, .PNG, .JPEG" onChange={handleImageChange} />
      {imagePreview ? <ThumbnailContainer><Preview src={imagePreview} /></ThumbnailContainer> : <div />}
    </div>
  );
}


const Preview = styled.img`
    max-width: 100%;
    max-height: 100%;
    align-items: center;
    justify-content: center;
`
const ThumbnailContainer = styled.div`
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
`;