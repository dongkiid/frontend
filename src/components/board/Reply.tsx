import api from "lib/api"
import { Stack, Box, Button, TextField, Avatar, Divider, Typography, IconButton } from '@mui/material';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


interface ReplyList {
    rid: number,
    content: string,
    writerNickname: string,
    moddate: string,
    mine: boolean
}

export default function Reply(): JSX.Element {

    const [refresh, setRefresh] = useState(1)


    const { boardId } = useParams();

    const [rId, setRId] = useState(0);

    const [reply, setReply] = useState({
        boardId: '',
        content: ''
    });

    const [updateRepl, setUpdateRepl] = useState({
        boardId: '',
        content: ''
    });


    const [upButton, setUpButton] = useState(false);

    const [replyList, setReplyList] = useState<ReplyList[] | null>();

    //댓글 새로 등록
    const handleReplyForm = (e) => {

        //리랜더링 방지
        e.preventDefault();
        api.post("api/reply/create", JSON.stringify(reply))
            .then((res) => {
                console.log(res.data)
                //refresh값으로 useeffect 관리(데이터 변화할때마다 state 상태 변화시킴(새로고침없이 데이터 랜더링))
                setRefresh(refresh => refresh * -1);

            }).catch((e) => {
                console.log(e)
            })
    }


    //댓글 수정
    const handleUpdateRepl = () => {
        api.put(`api/reply/update/${rId}`, JSON.stringify(updateRepl))
            .then((res) => {
                console.log(res.data)
                window.location.reload();

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

    //업데이트할 댓글과 댓글 등록용 input값 타겟 관리
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        targetStateUpdater: React.Dispatch<React.SetStateAction<any>>) => {
        const { value } = e.target;

        targetStateUpdater((prevData) => ({
            ...prevData,
            content: value,
            boardId: boardId
        }))
    }

    //댓글 목록
    const GetReplyList = () => {
        api.get(`api/reply/list/${boardId}`)
            .then((res) => {
                setReplyList(res.data.data)
                console.log(res.data.data)
            }).catch((e) => {
                console.log(e);
            })

    }

    //업데이트 버튼 상태관리
    const handleUpButton = () => {
        setUpButton(true)
    }


    useEffect(() => {
        GetReplyList();
    }, [refresh])


    return (
        <>
            <Box >
                <Box component="form" sx={{ display: 'flex', justifyContent: 'center', m: 5 }}>
                    <TextField
                        onChange={(e) => handleInputChange(e, setReply)}
                        value={reply.content}
                        multiline
                        maxRows={4}
                        fullWidth
                    />
                    <Button type="submit" onClick={handleReplyForm} >등록</Button>
                </Box>
                <Divider sx={{ m: 5 }} />
                {replyList && replyList.map(comment => (
                    <Box key={comment.rid} sx={{ mx: 5 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={5}>
                            {upButton && comment.mine ? (<>
                                    <Typography noWrap variant="button" >{comment.writerNickname}</Typography>
                                    <TextField
                                    fullWidth
                                        multiline
                                        maxRows={4}
                                        sx={{width:"40rem"}}
                                        onChange={(e) => {
                                            setRId(comment.rid);
                                            console.log("rId" + comment.rid)
                                            handleInputChange(e, setUpdateRepl)
                                        }}

                                        defaultValue={comment.content}
                                    />
                                <Stack direction="row" alignItems="center" >
                                    <Button onClick={handleUpdateRepl}   >수정</Button>
                                </Stack>
                            </>) : <>
                                <Stack direction="row" spacing={5}>
                                    <Typography variant="button" >{comment.writerNickname}</Typography>
                                    <Box >{comment.content}</Box></Stack>
                                <Stack direction="row" alignItems="center">
                                    {comment.mine ? (
                                        <>
                                            <Stack direction="row" >
                                                <IconButton size="small" onClick={handleUpButton} >
                                                    <CreateOutlinedIcon />
                                                </IconButton>
                                                <IconButton size="small"
                                                    onClick={() => { handleReplDelete(comment.rid); }}>
                                                    <ClearOutlinedIcon />
                                                </IconButton>
                                            </Stack>
                                        </>
                                    ) : <></>}
                                    <Box sx={{ fontSize: "0.7rem", ml: 1, alignItems: "center" }}>{moment(comment.moddate).format('YYYY-MM-DD HH:mm')}</Box>
                                </Stack>
                            </>
                            }


                        </Stack>
                        <Divider sx={{ my: 5 }} />

                    </Box>
                ))}
            </Box>
        </>
    )
}


