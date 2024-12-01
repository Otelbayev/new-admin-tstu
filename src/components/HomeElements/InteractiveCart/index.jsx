import React from "react";
import { Wrap } from "./style";
import Image from "../../Image";

const InteractiveCart = ({ prop, aos }) => {
  return (
    <Wrap data-aos={aos} onClick={() => window.open(prop?.url_, "_blank")}>
      <Image
        src={`${import.meta.env.VITE_BASE_URL_IMG}${
          prop?.icon_?.url || prop?.icon_translation_?.url
        }`}
        alt=""
      />
      <div className={"title"}>{prop?.title}</div>
    </Wrap>
  );
};

export default InteractiveCart;
