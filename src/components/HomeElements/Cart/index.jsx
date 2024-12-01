import React, { useState } from "react";
import { Wrap } from "./style";
import { getDate } from "../../../utils/month";
import Image from "../../Image";

// const Cart = ({ onClick, item }) => {
//   return (
//     <Wrap onClick={onClick}>
//       <Wrap.Img
//         src={`${import.meta.env.VITE_BASE_URL_IMG}${
//           item?.img_?.url || item?.img_translation_?.url
//         }`}
//       >
//         {/* <img
//           loading="lazy"
//           src={`${import.meta.env.VITE_BASE_URL_IMG}${
//             item?.img_?.url || item?.img_translation_?.url
//           }`}
//           alt=""
//         /> */}
//       </Wrap.Img>
//       <Wrap.Content>
//         <Wrap.Date>
//           <span className="left">
//             {item?.blog_category_?.title ||
//               item?.blog_category_translation_?.title}{" "}
//           </span>
//           <span className="date">
//             TSTU | {getDate(item?.event_date?.split("T")[0])}
//           </span>
//         </Wrap.Date>
//         <Wrap.Title onClick={onClick}>
//           {item?.title?.split(" ")?.length <= 4
//             ? item.title
//             : item?.title?.split(" ")?.slice(0, 3)?.join(" ") + "..."}
//           <div className="bottom"></div>
//         </Wrap.Title>
//       </Wrap.Content>
//     </Wrap>
//   );
// };

const Cart = ({ onClick, item }) => {
  return (
    <Wrap onClick={onClick}>
      <div className="ccontent">
        <div className="ccontent__image">
          <Image
            src={`${import.meta.env.VITE_BASE_URL_IMG}${
              item?.img_?.url || item?.img_translation_?.url
            }`}
            className="ccontent__image--img"
          />
        </div>
        <div className="ccontent__bottom">
          <div className="ccontent__bottom--date">
            <span className="left">
              {item?.blog_category_?.title ||
                item?.blog_category_translation_?.title ||
                "........."}{" "}
            </span>
            <span className="date">
              TSTU | {getDate(item?.event_date?.split("T")[0])}
            </span>
          </div>
          <div className="ccontent__bottom--title">
            {item?.title?.split(" ")?.length <= 4
              ? item.title || "........"
              : item?.title?.split(" ")?.slice(0, 3)?.join(" ") ||
                "..." + "..." ||
                "........"}
            <div className="bottom"></div>
          </div>
        </div>
      </div>
    </Wrap>
  );
};

export default Cart;
