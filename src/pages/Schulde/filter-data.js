import dayjs from "dayjs";

export const filteredData = (data) => {
  function getWeekStart(date) {
    return dayjs.unix(date).startOf("week").unix();
  }

  const startOfCurrentWeek = dayjs().startOf("week").unix();
  const startOfNextWeek = dayjs().add(1, "week").startOf("week").unix();

  const weekData = {
    currentWeek: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
    nextWeek: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
  };

  function getDayOfWeek(date) {
    return dayjs.unix(date).format("dddd");
  }

  data.forEach((item) => {
    const lessonDate = item.lesson_date;
    const weekStart = getWeekStart(lessonDate);
    const dayOfWeek = getDayOfWeek(lessonDate);

    if (weekStart === startOfCurrentWeek) {
      weekData.currentWeek[dayOfWeek].push(item);
    } else if (weekStart === startOfNextWeek) {
      weekData.nextWeek[dayOfWeek].push(item);
    }
  });

  return weekData;
};
