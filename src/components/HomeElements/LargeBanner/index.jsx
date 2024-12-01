import React, { useEffect, useRef, useState } from "react";
import { Large } from "./style";
import { getDate } from "../../../utils/month";
import Image from "../../Image";

const LargeBanner = ({ onClick, item, type }) => {
  const textRef = useRef(null); // Reference to the <p> element
  const [textHeight, setTextHeight] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.clientHeight);
    }
  }, []);

  return (
    <Large $w={textHeight} onClick={onClick}>
      <div className="ccontent">
        <div className="ccontent__bg">
          <Image
            src={`${import.meta.env.VITE_BASE_URL_IMG}${
              item?.img_?.url || item?.img_translation_?.url
            }`}
            className="ccontent__bg--img"
          />
        </div>
        <div className="ccontent__abs">
          <div className="ccontent__abs--date">
            {type === "news" && (
              <span>
                {item?.blog_category_?.title ||
                  item?.blog_category_translation_?.title ||
                  "......"}{" "}
              </span>
            )}
            <span>
              {type === "events" && (
                <i className="fa-solid fa-calendar-days"></i>
              )}{" "}
              {(type === "news" || type === "events") &&
                `TSTU | ${getDate(item?.event_date?.split("T")[0])}`}
            </span>
            {type === "events" && (
              <span>
                <i className="fa-solid fa-user"></i> Pedagok
              </span>
            )}
          </div>
          <div className="ccontent__abs--title">
            {item?.title?.split(" ")?.length <= 4
              ? item.title || "........"
              : item?.title?.split(" ")?.slice(0, 3)?.join(" ") ||
                "..." + "..." ||
                "........"}
            <div className="bottom"></div>
          </div>
          <div ref={textRef} className="ccontent__abs--desc">
            {item?.description || "........"}
          </div>
        </div>
      </div>
    </Large>
  );
};

export default LargeBanner;
