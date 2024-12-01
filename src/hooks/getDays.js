import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export const getDays = () => {
  function getWeekDatesObject(startOfWeek) {
    const weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekDates = {};
    weekDays.forEach((day, index) => {
      weekDates[day] = startOfWeek.add(index, "day").format("DD/MM/YYYY");
    });
    return weekDates;
  }

  const startOfCurrentWeek = dayjs().startOf("isoWeek");
  const startOfNextWeek = startOfCurrentWeek.add(1, "week");

  const currentWeekDates = getWeekDatesObject(startOfCurrentWeek);
  const nextWeekDates = getWeekDatesObject(startOfNextWeek);

  return { currentWeekDates, nextWeekDates };
};
