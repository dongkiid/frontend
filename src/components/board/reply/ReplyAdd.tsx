import api from "lib/api"
import { Box, Button, TextField } from '@mui/material';
import { useParams } from "react-router-dom";
import React, { useState } from 'react';



export default function ReplyAdd({ setRefresh }): JSX.Element {


    const [reply, setReply] = useState({
        boardId: '',
        content: ''
    });

    const {boardId} = useParams();

    //댓글 새로 등록
    const handleReplyForm = (e) => {

        //리랜더링 방지
        e.preventDefault();
        api.post("api/reply/create", JSON.stringify(reply))
            .then((res) => {
                console.log(res.data)
                //refresh값으로 useeffect 관리(데이터 변화할때마다 state 상태 변화시킴(새로고침없이 데이터 랜더링))
                setRefresh(refresh => refresh * -1);
                setReply({...reply, content:''})

            }).catch((e) => {
                console.log(e)
            })
    }


    return (
        <>
                <Box component="form" sx={{ display: 'flex', justifyContent: 'center', m: 5 }}>
                    <TextField
                        onChange={(e) => handleInputChange(e, setReply, boardId)}
                        value={reply.content}
                        multiline
                        maxRows={4}
                        fullWidth
                    />
                    <Button type="submit" onClick={handleReplyForm} >등록</Button>
                </Box>


        </>
    )
}




//업데이트할 댓글과 댓글 등록용 input값 타겟 관리용 함수 export
export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    targetStateUpdater: React.Dispatch<React.SetStateAction<any>>, boardId2) => {
    const { value } = e.target;

    targetStateUpdater((prevData) => ({
        ...prevData,
        content: value,
        boardId: boardId2
    }))
}

