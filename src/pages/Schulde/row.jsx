import { Card, Col, Empty, Row } from "antd";
import React from "react";
import styled from "styled-components";

const Srow = ({ loading, d1, d2, d3, d4, d5, d6, date }) => {
  return (
    <Row style={{ padding: "20px" }} gutter={[10, 10]}>
      <Col xs={24} md={12} lg={8}>
        <Card
          title="Dushanba"
          bordered={true}
          extra={<div>{date?.Monday}</div>}
          loading={loading}
        >
          {d1?.length ? (
            d1
              .sort(
                (a, b) =>
                  Number(a.lessonPair?.start_time?.slice(0, 1)) -
                  Number(b.lessonPair?.start_time?.slice(0, 1))
              )
              .map((item) => (
                <Ul $isLast={item === d1[d1.length - 1]} key={item.id}>
                  <li>
                    Guruh: <span>{item.group.name}</span>
                  </li>
                  <li>
                    Fan: <span>{item.subject.name}</span>
                  </li>
                  <li>
                    O‘qituvchi <span>{item.employee.name} </span>
                  </li>
                  <li>
                    {item.lessonPair.start_time} - {item.lessonPair.end_time} /{" "}
                    {item.trainingType.name} / {item.auditorium.name} - xona
                  </li>
                </Ul>
              ))
          ) : (
            <Empty />
          )}
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card
          title="Seshanba"
          bordered={true}
          extra={<div>{date?.Tuesday}</div>}
          loading={loading}
        >
          {d2?.length ? (
            d2
              .sort(
                (a, b) =>
                  Number(a.lessonPair?.start_time?.slice(0, 2)) -
                  Number(b.lessonPair?.start_time?.slice(0, 2))
              )
              .map((item) => (
                <Ul $isLast={item === d2[d2.length - 1]} key={item.id}>
                  <li>
                    Guruh: <span>{item.group.name}</span>
                  </li>
                  <li>
                    Fan: <span>{item.subject.name}</span>
                  </li>
                  <li>
                    O‘qituvchi <span>{item.employee.name} </span>
                  </li>
                  <li>
                    {item.lessonPair.start_time} - {item.lessonPair.end_time} /{" "}
                    {item.trainingType.name} / {item.auditorium.name} - xona
                  </li>
                </Ul>
              ))
          ) : (
            <Empty />
          )}
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card
          title="Chorshanba"
          bordered={true}
          extra={<div>{date?.Wednesday}</div>}
          loading={loading}
        >
          {d3?.length ? (
            d3
              .sort(
                (a, b) =>
                  Number(a.lessonPair?.start_time?.slice(0, 2)) -
                  Number(b.lessonPair?.start_time?.slice(0, 2))
              )
              .map((item) => (
                <Ul $isLast={item === d3[d3.length - 1]} key={item.id}>
                  <li>
                    Guruh: <span>{item.group.name}</span>
                  </li>
                  <li>
                    Fan: <span>{item.subject.name}</span>
                  </li>
                  <li>
                    O‘qituvchi <span>{item.employee.name} </span>
                  </li>
                  <li>
                    {item.lessonPair.start_time} - {item.lessonPair.end_time} /{" "}
                    {item.trainingType.name} / {item.auditorium.name} - xona
                  </li>
                </Ul>
              ))
          ) : (
            <Empty />
          )}
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card
          title="Payshanba"
          bordered={true}
          extra={<div>{date?.Thursday}</div>}
          loading={loading}
        >
          {d4?.length ? (
            d4
              .sort(
                (a, b) =>
                  Number(a.lessonPair?.start_time?.slice(0, 2)) -
                  Number(b.lessonPair?.start_time?.slice(0, 2))
              )
              .map((item) => (
                <Ul $isLast={item === d4[d4.length - 1]} key={item.id}>
                  <li>
                    Guruh: <span>{item.group.name}</span>
                  </li>
                  <li>
                    Fan: <span>{item.subject.name}</span>
                  </li>
                  <li>
                    O‘qituvchi <span>{item.employee.name} </span>
                  </li>
                  <li>
                    {item.lessonPair.start_time} - {item.lessonPair.end_time} /{" "}
                    {item.trainingType.name} / {item.auditorium.name} - xona
                  </li>
                </Ul>
              ))
          ) : (
            <Empty />
          )}
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card
          title="Juma"
          bordered={true}
          extra={<div>{date?.Friday}</div>}
          loading={loading}
        >
          {d5?.length ? (
            d5
              .sort(
                (a, b) =>
                  Number(a.lessonPair?.start_time?.slice(0, 2)) -
                  Number(b.lessonPair?.start_time?.slice(0, 2))
              )
              .map((item) => (
                <Ul $isLast={item === d5[d5.length - 1]} key={item.id}>
                  <li>
                    Guruh: <span>{item.group.name}</span>
                  </li>
                  <li>
                    Fan: <span>{item.subject.name}</span>
                  </li>
                  <li>
                    O‘qituvchi <span>{item.employee.name} </span>
                  </li>
                  <li>
                    {item.lessonPair.start_time} - {item.lessonPair.end_time} /{" "}
                    {item.trainingType.name} / {item.auditorium.name} - xona
                  </li>
                </Ul>
              ))
          ) : (
            <Empty />
          )}
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card
          title="Shanba"
          bordered={true}
          extra={<div>{date?.Saturday}</div>}
          loading={loading}
        >
          {d6?.length ? (
            d6
              .sort(
                (a, b) =>
                  Number(a.lessonPair?.start_time?.slice(0, 2)) -
                  Number(b.lessonPair?.start_time?.slice(0, 2))
              )
              .map((item) => (
                <Ul $isLast={item === d6[d6.length - 1]} key={item.id}>
                  <li>
                    Guruh: <span>{item.group.name}</span>
                  </li>
                  <li>
                    Fan: <span>{item.subject.name}</span>
                  </li>
                  <li>
                    O‘qituvchi <span>{item.employee.name} </span>
                  </li>
                  <li>
                    {item.lessonPair.start_time} - {item.lessonPair.end_time} /{" "}
                    {item.trainingType.name} / {item.auditorium.name} - xona
                  </li>
                </Ul>
              ))
          ) : (
            <Empty />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Srow;

const Ul = styled.ul`
  list-style-type: none;
  font-size: 14px;
  ${({ $isLast }) =>
    !$isLast &&
    `
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
  `}
  li {
    span {
      font-weight: bold;
    }
  }
`;
