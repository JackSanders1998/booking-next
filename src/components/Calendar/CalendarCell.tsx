import { useRef, useState } from "react";
import type { AriaCalendarCellProps} from "@react-aria/calendar";
import { useCalendarCell } from "@react-aria/calendar";
import { isSameMonth } from "@internationalized/date";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState, RangeCalendarState } from "@react-stately/calendar";
import type { DateValue } from "@internationalized/date";
import type { Draft } from "immer";
import produce from "immer";
import { dateValueAtom } from "stores/DateValueStore";
import { useAtom } from "jotai";

interface CalendarCellProps {
  state: CalendarState | RangeCalendarState;
  date: AriaCalendarCellProps["date"];
  currentMonth: AriaCalendarCellProps["date"];
}

export const CalendarCell = ({ state, date, currentMonth }: CalendarCellProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const {
    cellProps,
    buttonProps,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  const isOutsideMonth = !isSameMonth(currentMonth, date);
  const { focusProps, isFocusVisible } = useFocusRing();

  const [, setDays] = useAtom(dateValueAtom);
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setDays(
      produce((draft: Draft<DateValue>[]) => {
        if (isSelected) {
          draft.splice(draft.indexOf(date), 1);
        } else {
          draft.push(date);
        }
      })
    );
    setIsSelected(!isSelected);
  };

  return (
    <td
      {...cellProps}
      className={`py-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className={`w-10 h-10 outline-none group rounded-full ${
          isSelected ? "bg-violet-600 text-white hover:bg-violet-700" : ""
        } ${isDisabled ? "disabled" : ""}`}
        onClick={handleClick}
        disabled={isDisabled}
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
            // Hover state for non-selected cells.
            !isSelected && !isDisabled ? "hover:bg-violet-100" : ""
          } cursor-default`}
        >
          {formattedDate}
        </div>
      </button>
    </td>
  );
}
