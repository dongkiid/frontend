import React, { useEffect, useState } from 'react';
import { AppNewsUpdate } from "sections/@dashboard/app"
import api from "lib/api";
import boardResponseDto from 'dto/boardResponseDto';
import { Link } from 'react-router-dom';
import logo from '../../styles/img/edit_logo2.png'

// 대체 이미지 경로
function RecentlyBoards(): JSX.Element {
    const [recentlyBoardList, setRecentlyBoardList] = useState<boardResponseDto[] | null>(null);
    
    const fetchBoards = () => {
        api.get(`/api/board/recently`)
          .then((response) => {
            // 데이터를 배열로 변환하고 설정
            console.log(response.data.data.content);
            setRecentlyBoardList(response.data.data.content);
          })
          .catch((error) => {
            console.log(error);
          });
    };

    useEffect(() => {
        fetchBoards();
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

    return (
        <>
            {/* recentlyBoardList가 로드되면 데이터를 AppNewsUpdate 컴포넌트에 전달 */}
            {recentlyBoardList !== null && (
                <AppNewsUpdate
                    title="최신 글"
                    subheader="전국 집사님들의 새로운 소식을 확인해보세요!"
                    list={recentlyBoardList.map((item) => ({
                        id: item.boardId,
                        title: (
                            <Link to={`/board/${item.boardId}`}>{item.title}</Link>
                        ),
                        description: item.content,
                        image: item.image || logo, // 이미지가 비어있으면 대체 이미지 경로 사용
                        postedAt: item.moddate,
                    }))}
                />
            )}
        </>
    );
}

export default RecentlyBoards;
