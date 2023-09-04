import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import { DatePickerWrapper } from "../style/StyledCalendar";

const StyledDatepicker = styled(DatePicker)`
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  text-align: center;
  border: 2px solid black;
`;

export default function Calendar({
  handleDate,
  selectedDate,
  disabled = false,
}: {
  handleDate: (date: Date) => void;
  selectedDate: Date;
  disabled: boolean;
}) {
  return (
    <DatePickerWrapper>
      <StyledDatepicker
        dateFormat={"yyyy년 MM월 dd일"}
        locale={ko}
        shouldCloseOnSelect
        closeOnScroll={true}
        selected={selectedDate}
        onChange={(date: Date) => handleDate(date)}
        disabled={disabled}
      />
    </DatePickerWrapper>
  );
}
