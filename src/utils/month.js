import { useTranslation } from "react-i18next";

const monthUz = {
  "01": "Yan",
  "02": "Fev",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Iyun",
  "07": "Iyul",
  "08": "Avg",
  "09": "Sen",
  10: "Oct",
  11: "Noy",
  12: "Dek",
};

const monthEn = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const monthRu = {
  "01": "Янв",
  "02": "Фев",
  "03": "Мар",
  "04": "Апр",
  "05": "Май",
  "06": "Июн",
  "07": "Июл",
  "08": "Авг",
  "09": "Сен",
  10: "Окт",
  11: "Ноя",
  12: "Дек",
};

export const getDate = (date) => {
  const { i18n } = useTranslation();

  if (!date) {
    return ".......";
  }

  if (date) {
    let [year, month, day] = date?.split("-");
    const months = {
      uz: monthUz,
      ru: monthRu,
      en: monthEn,
    };

    const monthNames = months[i18n.language];
    return `${monthNames[month]} ${day}, ${year}`;
  }
};
