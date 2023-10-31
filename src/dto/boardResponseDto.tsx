
export default interface boardResponseDto {
    boardId: number;
    title: string;
    content: string;
    category: string;
    image: string;
    writerNickname: string;
    writerLocation: string;
    regdate: string | Date;
    moddate: string | Date;
    clickCnt: number;
    bcode: string;
  };

