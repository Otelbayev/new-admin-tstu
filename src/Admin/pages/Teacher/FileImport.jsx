import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";
import Upload from "./upload-content";
import { Select } from "../../components/Generics";
import { useDateContext } from "../../context/DateContext";
import { studyYears } from "../../utils/mock";
import DownloadFile from "../../components/file-download";
import { Helmet } from "react-helmet";

const getSize = (id, $italic) => {
  if (!$italic) {
    return "14px";
  }
  switch (id) {
    case 0:
      return "20px";
    case 1:
      return "18px";
    case 2:
      return "16px";
    default:
      return "14px";
  }
};

const Space = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  .ball {
    white-space: nowrap;
    font-style: ${({ $italic }) => ($italic ? "" : "italic")};
    font-weight: ${({ $italic }) => ($italic ? "" : "400")};
    font-size: ${({ $italic, id }) => getSize(id, $italic)};
  }
  .panel-title {
    font-style: ${({ $italic }) => ($italic ? "" : "italic")};
    font-weight: ${({ $italic }) => ($italic ? "" : "400")};
    font-size: ${({ $italic, id }) => getSize(id, $italic)};
  }
`;

const { Panel } = Collapse;

const FileImport = () => {
  const { old_year, setOldYear } = useDateContext();
  const [rawData, setRawData] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [count, setCount] = useState(0);

  const getData = async (old_year) => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110controller/getalldocumentteacher110?old_year=${old_year}&new_year=${
        Number(old_year) + 1
      }`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );

    res.status === 200 && setRawData(res.data);
  };

  const getBall = async (old_year) => {
    const res2 = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110setcontroller/getteacherdocumentscore?oldYear=${old_year}&newYear=${
        Number(old_year) + 1
      }`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    );
    setCount(res2.data?.summ_score || 0);
  };

  useEffect(() => {
    getBall(old_year);
    getData(old_year);
  }, [old_year]);

  const buildPanels = (items) => {
    return items
      .sort((a, b) => a.id - b.id)
      .map((item) => (
        <Panel
          key={item.id}
          header={
            <Space $italic={item.indicator} id={item.parent_id}>
              <div className="panel-title">{item.title}</div>
              <div className="ball">
                <span className="text-success p-1 rounded">
                  {item.id === 89 ? null : item.max_score + " /"}
                </span>{" "}
                <span className="text-primary p-1 rounded">{item.score}</span>{" "}
                ball
              </div>
            </Space>
          }
        >
          {item.children?.length ? (
            <Collapse>{buildPanels(item.children)}</Collapse>
          ) : (
            <Upload
              old_year={old_year}
              new_year={Number(old_year) + 1}
              id={item.id}
              upd={updateData}
              max_score={item?.max_score}
              score={item?.score}
              author={item?.avtor}
            />
          )}
        </Panel>
      ));
  };

  const buildNestedItems = (data, parentId) => {
    return data
      .filter((item) => item.parent_id === parentId)
      .map((item) => {
        return {
          ...item,
          children: buildNestedItems(data, item.id),
        };
      });
  };

  const nestedItems = buildNestedItems(rawData, 0);

  return (
    <div>
      <Helmet>Pedagog xodimlarning o‘quv yilidagi faoliyatini baholash</Helmet>
      <section className="content">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <h1>
                  Pedagog xodimlarning o‘quv yilidagi faoliyatini baholash
                </h1>
              </div>
            </div>
          </div>
        </section>
        <div className="container-fluid">
          <section className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header pl-4">
                  <div className="row">
                    <div className="col row">
                      <h3 className="col-5 py-2">O'quv yili:</h3>
                      <Select
                        value={old_year}
                        options={studyYears}
                        className={"col-7 py-2"}
                        onChange={(e) => {
                          setOldYear(e);
                          setUpdateData({ name: "Jasurbek" });
                        }}
                      />
                    </div>
                    <h3 className="col py-2">
                      Maksimal Ball :{" "}
                      <h2 className="text-success p-1 rounded d-inline">110</h2>
                    </h3>
                    <h3 className="col py-2">
                      To'plangan Ball :{" "}
                      <h2 className="text-primary p-1 rounded d-inline">
                        {count}
                      </h2>
                    </h3>
                    <div className="text-right col-md-4">
                      <DownloadFile />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Collapse>{buildPanels(nestedItems)}</Collapse>
                </div>
                <div className="card-footer clearfix">
                  <ul className="pagination pagination-sm m-0 float-right"></ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default FileImport;
