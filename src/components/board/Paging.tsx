import React, { useEffect } from "react";
import "./styles/Paging.css";
import Pagination from "react-js-pagination";

interface PagingProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

function Paging({
  totalPages,
  currentPage,
  onPageChange,
}: PagingProps): JSX.Element {

  const handlePageChange = (page: number) => {
    onPageChange(page - 1); // 서버로 전달할 때 1을 빼준다.
  };

  useEffect(() => {
  }, [currentPage]);

  return (
    <div>
      <p>Total Pages: {totalPages}</p>
      <Pagination
        activePage={currentPage+1} // 정확한 페이지를 표시를 위해 currentPage에 1을 더해준다.
        itemsCountPerPage={5} // 한 페이지에 보여줄 게시물 수
        totalItemsCount={totalPages * 5} // 전체 게시물 수 (totalPages를 페이지 당 아이템 수로 곱함)
        pageRangeDisplayed={5} // 페이징 표시 최대 개수 (이 이상은 양 옆으로 넘어감)
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default Paging;
