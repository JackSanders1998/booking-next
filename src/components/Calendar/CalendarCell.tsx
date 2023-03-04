import { useRef } from "react";
import type { AriaCalendarCellProps} from "@react-aria/calendar";
import { useCalendarCell } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { isSameDay, getDayOfWeek, isSameMonth } from "@internationalized/date";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState, RangeCalendarState } from "@react-stately/calendar";

interface CalendarCellProps {
  state: CalendarState | RangeCalendarState;
  date: AriaCalendarCellProps["date"];
  currentMonth: AriaCalendarCellProps["date"];
}

export const CalendarCell = ({ state, date, currentMonth }: CalendarCellProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isDisabled,
    formattedDate
  } = useCalendarCell({ date }, state, ref);

  const isOutsideMonth = !isSameMonth(currentMonth, date);

  // The start and end date of the selected range will have
  // an emphasized appearance.
  const isSelectionStart = ('highlightedRange' in state && state.highlightedRange)
    ? isSameDay(date, state.highlightedRange.start)
    : isSelected;
  const isSelectionEnd = ('highlightedRange' in state && state.highlightedRange)
    ? isSameDay(date, state.highlightedRange.end)
    : isSelected;

  // Rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // Rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  const { locale } = useLocale();
  const dayOfWeek = getDayOfWeek(date, locale);
  const isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  const isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date));

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={`py-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className={`w-10 h-10 outline-none group ${
          isRoundedLeft ? "rounded-l-full" : ""
        } ${isRoundedRight ? "rounded-r-full" : ""} ${
          isSelected ? "bg-violet-300" : ""
        } ${isDisabled ? "disabled" : ""}`}
      >
        <div
          className={`w-full h-full rounded-full flex items-center justify-center ${
            isDisabled ? "text-gray-400" : ""
          } ${
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible
              ? "ring-2 group-focus:z-2 ring-violet-600 ring-offset-2"
              : ""
          } ${
            // Darker selection background for the start and end.
            isSelectionStart || isSelectionEnd
              ? "bg-violet-600 text-white hover:bg-violet-700"
              : ""
          } ${
            // Hover state for cells in the middle of the range.
            isSelected && !(isSelectionStart || isSelectionEnd)
              ? "hover:bg-violet-400"
              : ""
          } ${
            // Hover state for non-selected cells.
            !isSelected && !isDisabled ? "hover:bg-violet-100" : ""
          } cursor-default`}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
}
