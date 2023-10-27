import {Diary }from "../components/diary/Diary";
import { Helmet } from 'react-helmet-async';

export default function DiaryPage() {
    return (
        <>
            <Helmet>
                <title> 반려일지 | 펫구름 </title>
            </Helmet>
            <Diary />
        </>
    )
}
