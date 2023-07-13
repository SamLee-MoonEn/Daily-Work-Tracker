import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import tw from "twin.macro";
import { DatePickerWrapper } from "../style/StyledCalendar";

const StyledDatepicker = styled(DatePicker)`
  ${tw`border border-2 border-black w-full rounded-lg h-12 text-center`}
`;

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <DatePickerWrapper>
      <StyledDatepicker
        dateFormat={"yyyy년 MM월 dd일"}
        locale={ko}
        shouldCloseOnSelect
        selected={selectedDate}
        onChange={(date: Date) => handleDate(date)}
      />
    </DatePickerWrapper>
  );
}
