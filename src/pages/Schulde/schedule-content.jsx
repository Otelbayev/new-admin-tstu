import { Button, Flex, Radio } from "antd";
import React, { useRef, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import Srow from "./row";
import { filteredData } from "./filter-data";
import { getDays } from "../../hooks/getDays";
import domtoimage from "dom-to-image";

const options = [
  {
    label: "JORIY HAFTA",
    value: "this",
  },
  {
    label: "KELGUSI HAFTA",
    value: "next",
  },
];

const ScheduleContent = ({ loading, data }) => {
  const captureRef = useRef(null);

  const { currentWeekDates, nextWeekDates } = getDays();
  const [week, setWeek] = useState("this");
  const [date, setDate] = useState(currentWeekDates);

  const captureAndDownload1 = () => {
    const targetDiv = captureRef.current;

    if (!targetDiv) {
      console.error("Target element not found.");
      return;
    }

    domtoimage
      .toPng(targetDiv)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "File1.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
      });
  };

  const fData = filteredData(data, week);

  const onRadioChange = (e) => {
    setWeek(e.target.value);
    if (e.target.value === "this") {
      setDate(currentWeekDates);
    } else {
      setDate(nextWeekDates);
    }
  };

  return (
    <>
      <Flex
        vertical
        gap="middle"
        align="center"
        justify="center"
        className="my-4"
      >
        <Radio.Group
          block
          options={options}
          value={week}
          optionType="button"
          buttonStyle="solid"
          size="large"
          onChange={onRadioChange}
        />
        <Button
          type="primary"
          onClick={captureAndDownload1}
          icon={<DownloadOutlined />}
          size={"large"}
        >
          Yuklab olish
        </Button>
      </Flex>
      <div ref={captureRef}>
        <Srow
          date={date}
          d1={
            week === "this" ? fData?.currentWeek.Monday : fData?.nextWeek.Monday
          }
          d2={
            week === "this"
              ? fData?.currentWeek.Tuesday
              : fData?.nextWeek.Tuesday
          }
          d3={
            week === "this"
              ? fData?.currentWeek.Wednesday
              : fData?.nextWeek.Wednesday
          }
          d4={
            week === "this"
              ? fData?.currentWeek.Thursday
              : fData?.nextWeek.Thursday
          }
          d5={
            week === "this" ? fData?.currentWeek.Friday : fData?.nextWeek.Friday
          }
          d6={
            week === "this"
              ? fData?.currentWeek.Saturday
              : fData?.nextWeek.Saturday
          }
          loading={loading}
        />
      </div>
    </>
  );
};

export default ScheduleContent;
