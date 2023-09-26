import styled from "styled-components";
import check from "./check.svg";

export const CalendarContainer = styled.div`
  padding: 10px;
  border-radius: 8px;
`;

export const CalendarHeader = styled.div`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: space-between; /* 양쪽 끝에 정렬 */
  align-items: center;
  margin: 20px 14px 10px; /* 위쪽 여백은 20px, 아래쪽 여백은 10px로 조정 */

  span {
    line-height: 28px;
    margin-right: 8em;
  }

  img {
    width: 26px;
    cursor: pointer;
  }
`;

export const DateContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    & > div {
    margin: 4px auto;
    font-size: 15px;
    }
`;

export const DayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-gap: 8px;
`;

export const DateLabel = styled.div<{ $currentMonth?: boolean; $isToday?: boolean; $isSelected?: boolean }>`
  color: ${(props) => (props.$isToday ? 'orange' : props.$currentMonth ? 'black' : '#D5D5D5')};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
  display: flex;
  flex-direction: column; /* 컴포넌트를 위아래로 배치 */
  align-items: center; /* 가운데 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
  cursor: pointer;
`;

export const DateLabelButton = styled.button<{ $isCompleted?: boolean }>`
  background-color: ${(props) => (props.$isCompleted ? '#86E57F' : '#EAEAEA')};
  background-image: ${(props) => (props.$isCompleted ? `url(${check})` : 'none')};
  color: #A6A6A6; /* 버튼 텍스트의 글자색 */
  border: none; /* 버튼 테두리 제거 */
  border-radius: 30%; /* 원 모양의 버튼을 만듭니다. */
  width: 24px; /* 버튼의 너비 */
  height: 24px; /* 버튼의 높이 */
  margin-top: 4px; /* 버튼 위에 여백을 조절합니다. */
  cursor: pointer; /* 포인터 커서로 변경 */
`;