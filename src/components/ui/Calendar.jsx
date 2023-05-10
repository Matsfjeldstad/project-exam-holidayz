import { DayPicker } from "react-day-picker";
import PropTypes from "prop-types";

// Function that finds the closest booking date after the selected date

// function that disables days if range is overlapping days. like airbnbs calendar

export default function Calendar(props) {
  const { bookings } = props;

  return (
    <DayPicker
      showOutsideDays
      pagedNavigation
      fromMonth={new Date()}
      fromYear={new Date()}
      classNames={classNames}
      disabled={[
        ...bookings,
        {
          before: new Date(),
        },
      ]}
      {...props}
    />
  );
}

const classNames = {
  vhidden: "sr-only",
  caption: "flex justify-center items-center h-10",
  root: "text-gray-800",
  months: "flex gap-10 relative px-4",
  caption_label: "text-xl px-1",
  nav_button:
    "inline-flex justify-center items-center absolute top-0 w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100",
  nav_button_next: "right-0",
  nav_button_previous: "left-0",
  table: "border-collapse border-spacing-0",
  head_cell: "w-10 h-10 uppercase align-middle text-center",
  cell: "w-10 h-10 align-middle text-center border-0 px-0",
  day: "rounded-full w-10 h-10 transition-colors hover:border hover:border-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-300 focus-visible:ring-opacity-50 active:bg-[#FF004D] active:text-white",
  day_selected: "text-white bg-[#FF004D] hover:bg-pink-700",
  day_today: "font-bold",
  day_disabled:
    "opacity-25 hover:border-0 line-through hover:bg-white active:bg-white active:text-gray-800",
  day_outside: "enabled:opacity-50 ",
  day_range_middle: "rounded-none",
  day_range_end: "rounded-l-none rounded-r-full",
  day_range_start: "rounded-r-none rounded-l-full",
  day_hidden: "hidden",
};

//proptypes for calendar
Calendar.propTypes = {
  bookings: PropTypes.array,
  selected: PropTypes.object,
};
