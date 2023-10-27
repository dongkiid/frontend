import { useState, useEffect } from 'react';
import api from 'lib/api';
import { useParams } from 'react-router-dom';
import ReplyUpdate from './ReplyUpdate';
import ReplyAdd from './ReplyAdd';
import { Box, Divider } from '@mui/material';

interface ReplyList {
    rid: number,
    content: string,
    writerNickname: string,
    moddate: string,
    mine: boolean
}

const Reply = () => {
    const [selectedReplyIndex, setSelectedReplyIndex] = useState(0)

    const [replyList, setReplyList] = useState<ReplyList[] | null>();

    const { boardId } = useParams();

    const [refresh, setRefresh] = useState(1)

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

    useEffect(() => {
        GetReplyList();
    }, [refresh])



    return (
        <>
            <Box>
                {/* 댓글 등록 컴포넌트 */}
                <ReplyAdd setRefresh={setRefresh} />

                {replyList && replyList.map(reply => {
                    return (
                        <>
                            <Box key={reply.rid}>
                                <Divider sx={{ m: 5 }} />
                                {/* 댓글 수정 컴포넌트 */}
                                <ReplyUpdate
                                    setRefresh={setRefresh}
                                    reply={reply}
                                    isEditing={selectedReplyIndex === reply.rid ? true : false}
                                    setSelectedReplyIndex={setSelectedReplyIndex}
                                />
                            </Box>
                        </>
                    )
                })}

                <Divider sx={{ m: 5 }} />

            </Box>
        </>
    );
};

export default Reply;


