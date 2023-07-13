import styled from "styled-components";
import tw from "twin.macro";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerWrapper = styled.div`
  ${tw`w-full`}
  .react-datepicker {
    font-family: inherit;
    ${tw`shadow-lg p-3 text-[11px]`};
  }
  .react-datepicker__month-container {
    ${tw`border rounded-md`}
  }
  .react-datepicker-wrapper {
    ${tw`w-full`}
  }
  .react-datepicker__header {
    ${tw`bg-light border-none text-white`}
  }
  .react-datepicker__current-month,
  .react-datepicker__day-name {
    ${tw`text-white`}
  }

  .react-datepicker__navigation {
    ${tw`top-5`}
  }
  .react-datepicker__navigation--previous {
    ${tw`left-4`}
  }
  .react-datepicker__navigation--next {
    ${tw`right-4`}
  }
  .react-datepicker__triangle {
    transform: translate(134px, 0px) !important;
    ${tw`border-white`}
  }
  .react-datepicker-popper[data-placement^="bottom"]
    .react-datepicker__triangle::after {
    border-bottom-color: white !important;
    ${tw`border-b-white`}
  }
  .react-datepicker__day--selected {
    ${tw`text-white bg-light`}
  }
`;
