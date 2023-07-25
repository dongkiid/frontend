import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "components/member/Signup";
import api from "lib/api";
import PetImgUpload from "./PetImgUpload";
import { uploadS3 } from "lib/s3";

interface PetFormData {
    petname: string;
    age: number;
    type: string;
    weight: number;
    firstmet: string;
    file: File;
    petUrl: string
    petId: number
}

//현재 날짜(파일명을 위한)
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');


export const PetEdit = () => {
    const [petData, setPetData] = useState<PetFormData | null>(null);
    const [formattedDate, setFormattedDate] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<PetFormData>({ mode: 'all',
    defaultValues: petData
 });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);

    const navigate = useNavigate();

    //input 창 숫자만 입력가능하도록
    const numberInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }

    const handleFormSubmit = async (data: PetFormData) => {
        const formData = new FormData();
        const extension = fileName.split(".").pop(); // 파일 확장자 추출
        console.log(Date.now)

        //현재날짜와 랜덤 문자열로 파일명 변경
        const fileName2 = `${year}${month}${day}${hours}${minutes}_${Math.random().toString(36).substr(2, 9)}.${extension}`; // 현재 날짜와 랜덤 문자열로 파일명 생성

        formData.append('file', imageFile);
        formData.append('name', fileName2);
        formData.append('type', fileType);

        console.log("formData "+ formData.get('file'));

        //s3에 파일 업로드 및 링크 반환
        const petUrl = await uploadS3(formData)
        console.log("peturl "+petUrl)
        data.petUrl = petUrl;

        api.put(`pet/edit/${petData.petId}`, JSON.stringify(data))
            .then((res) => {
                alert("업로드 완료!");
                navigate("/");
                console.log(res.data);

            }).catch((err) => {
                console.log(err.message);

                alert("실패!");
            })

    }

    useEffect(()=>{
        getPetData()
      },[])
      
      //펫 정보 받아오는 함수
    const getPetData= () => {
        api.get("pet/petinfo")
        .then((res)=>{
            const petData: PetFormData = {
                ...res.data.data
            }
            setPetData(petData);
            setFormattedDate(new Date(petData.firstmet).toISOString().split('T')[0]);

            }).catch((error)=>{

          console.log(error.message)
        })
      }

    return (
        <>
        {petData ?
            <div className="petform">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="PetForm">
                    <h1>펫 수정</h1><br />
                    <PetImgUpload setImageFile={setImageFile} setFilename={setFileName} setFileType={setFileType} nowProfile={petData.petUrl}/>
                    펫 이름 :
                    <input type="text" defaultValue ={petData.petname}
                        {...register("petname", {
                            required: {
                                value: true,
                                message: '반려 동물의 이름을 입력해주세요'
                            },
                            minLength: 2,
                            maxLength: 20
                        })}
                    /><br />
                    {errors.petname && errors.petname?.type === 'required' && (
                        <ErrorMessage error={errors.petname} />

                    )}

                    나이 :
                    <input type="text" onInput={numberInput} defaultValue={petData.age}
                        {...register("age", {
                            required: {
                                value: true,
                                message: '반려 동물의 나이를 입력해주세요.(숫자만 입력가능)'
                            }
                        })}
                    /><br />
                    {errors.age && errors.age?.type === 'required' && (
                        <ErrorMessage error={errors.age} />

                    )}

                    펫 종류 :
                    <input type="text" defaultValue={petData.type}
                        {...register("type", {
                            required: {
                                value: true,
                                message: '반려 동물의 종을 입력해주세요'
                            },
                            minLength: 2,
                            maxLength: 20
                        })}
                    /><br />
                    {errors.type && errors.type?.type === 'required' && (
                        <ErrorMessage error={errors.type} />
                    )}

                    몸무게 :
                    <input type="text" onInput={numberInput} defaultValue={petData.weight}
                        {...register("weight", {
                            required: {
                                value: true,
                                message: '반려 동물의 몸무게를 입력해주세요.(숫자만 입력가능)'
                            }
                        })}
                    /><br />
                    {errors.weight && errors.weight?.type === 'required' && (
                        <ErrorMessage error={errors.weight} />

                    )}

                    처음 만난 날:<input type="date" id="firstmet" defaultValue={formattedDate} 
                        {...register("firstmet", {
                            required: {
                                value: true,
                                message: '반려 동물과의 처음 만난 날을 입력해주세요'
                            }
                        })} /><br />
                    {errors.firstmet && errors.firstmet?.type === 'required' && (
                        <ErrorMessage error={errors.firstmet} />

                    )}<br />
                    <p>
                        <button type="submit" >펫 수정</button>
                    </p><br />

                </form>
            </div>
: <></>}
        </>
    )


}

;
