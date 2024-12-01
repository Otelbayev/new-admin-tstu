import React from "react";
import { Content } from "./style";

const FakNews = ({ data }) => {
  return (
    <Content>
      {data?.img ? (
        <>
          <Content.Img loading="lazy" src={data.img} />
          <Content.Wrap>
            <Content.UserDate>
              <div>
                {data.personIcon}
                <span>{data.person}</span>
              </div>
              <div>
                {data.dataIcon}
                <span>{data.person}</span>
              </div>
            </Content.UserDate>
            <Content.Title>{data?.title}</Content.Title>
            <Content.Desc>{data?.desc}</Content.Desc>
          </Content.Wrap>
        </>
      ) : (
        <Content.Wrap>
          <Content.Title>{data?.title}</Content.Title>
          <Content.UserDate>
            <div>
              {data.personIcon}
              <span>{data.person}</span>
            </div>
            <div>
              {data.dataIcon}
              <span>{data.person}</span>
            </div>
          </Content.UserDate>
        </Content.Wrap>
      )}
    </Content>
  );
};

export default FakNews;
