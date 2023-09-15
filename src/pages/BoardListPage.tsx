import BoardList from "components/board/BoardList";
import { Helmet } from 'react-helmet-async';

export default function BoardListPage():JSX.Element {
    
    return (
        <>
            <Helmet>
                <title> 우리동네 | 펫구름 </title>
            </Helmet>
            <BoardList />
        </>
    )
}
