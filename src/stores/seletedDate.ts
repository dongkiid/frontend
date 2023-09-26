import dayjs from 'dayjs';
import { atom } from 'recoil';

const selectedDateState = atom({
  key: 'selectedDate',
  default: dayjs(),
});

export default selectedDateState;