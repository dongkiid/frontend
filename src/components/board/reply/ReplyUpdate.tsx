import api from "lib/api"
import { Stack, Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import moment from 'moment';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { handleInputChange } from "./ReplyAdd";



export default function ReplyUpdate({ setRefresh, reply,
    isEditing, setSelectedReplyIndex }): JSX.Element {

    const [updateRepl, setUpdateRepl] = useState({
        boardId: '',
        content: ''
    });


    //댓글 수정
    const handleUpdateRepl = () => {
        console.log("댓글 수정 핸들러: " + reply.rid)
        api.put(`api/reply/update/${reply.rid}`, JSON.stringify(updateRepl))
            .then((res) => {
                console.log(res.data)
                setRefresh(refresh => refresh * -1);
                setSelectedReplyIndex(0)
            }).catch((e) => {
                console.log(e)
            })
    }

    //댓글 삭제
    const handleReplDelete = async (rid) => {
        console.log("rid" + rid)
        try {
            const shouldDelete = window.confirm('댓글을 삭제하시겠습니까?');
            if (shouldDelete) {
                const res = await api.delete(`api/reply/delete/${rid}`);
                console.log(res.data);
                setRefresh(refresh => refresh * -1);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const { boardId } = useParams();



    return (
        <>
            <Box key={reply.rid} sx={{ mx: 5 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={5}>
                    {/* 수정버튼을 눌렀는지 여부에 따른 삼항연산자 */}
                    {isEditing ? (
                        // 수정 버튼 클릭o
                        <>
                            <Typography noWrap variant="button" >{reply.writerNickname}</Typography>
                            <TextField
                                fullWidth
                                multiline
                                maxRows={4}
                                sx={{ width: "40rem" }}
                                onChange={(e) => {
                                    handleInputChange(e, setUpdateRepl, boardId)
                                }}
                                defaultValue={reply.content}
                            />
                            <Stack direction="row" alignItems="center" >
                                <Button onClick={handleUpdateRepl} >수정</Button>
                            </Stack>
                        </>

                    ) :
                        //수정 버튼 클릭x
                        <>
                            <Stack direction="row" spacing={5}>
                                <Typography variant="button" >{reply.writerNickname}</Typography>
                                <Box >{reply.content}</Box>
                            </Stack>

                            <Stack direction="row" alignItems="center">

                                {/* 본인이 쓴 댓글인지 확인 후 맞다면 수정, 삭제 아이콘 표시하는 삼항연산자 */}
                                {reply.mine ? (
                                    <>
                                        <Stack direction="row" >
                                            <IconButton size="small" onClick={() => { setSelectedReplyIndex(reply.rid) }} >
                                                <CreateOutlinedIcon />
                                            </IconButton>
                                            <IconButton size="small"
                                                onClick={() => { handleReplDelete(reply.rid); }}>
                                                <ClearOutlinedIcon />
                                            </IconButton>
                                        </Stack>
                                    </>
                                ) : <></>}


                                <Box sx={{ fontSize: "0.7rem", ml: 1, alignItems: "center" }}>{moment(reply.moddate).format('YYYY-MM-DD HH:mm')}</Box>
                            </Stack>
                        </>
                    }
                </Stack>
            </Box>



        </>
    )
}


