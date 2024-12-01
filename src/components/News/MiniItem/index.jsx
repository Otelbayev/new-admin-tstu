import React from "react";
import { Container } from "./style";
import { getDate } from "../../../utils/month";

const MiniItem = ({ prop, onClick }) => {
  return (
    <Container>
      <div>
        <div className="mini-item-title" onClick={onClick}>
          {prop?.title?.split(" ")?.length < 7
            ? prop.title
            : prop?.title?.split(" ")?.slice(0, 7)?.join(" ") + "..."}
        </div>
        <div className="mini-item-date">
          <span>
            {prop?.blog_category_?.title ||
              prop?.blog_category_translation_?.title}
          </span>
          <span>{getDate(prop?.event_date?.split("T")[0])}</span>
        </div>
      </div>
    </Container>
  );
};

export default MiniItem;
