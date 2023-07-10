import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import tw from "twin.macro";

const CalendarWrapper = styled.div``;

const StyledDatepicker = styled(DatePicker)`
  ${tw`border border-neutral-400 outline-2 outline-neutral-400 rounded-lg w-full h-8 text-center`}
`;

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <CalendarWrapper>
      <StyledDatepicker
        locale={ko}
        shouldCloseOnSelect
        selected={selectedDate}
        onChange={(date: Date) => handleDate(date)}
      />
    </CalendarWrapper>
  );
}
