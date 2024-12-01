import React, { useRef } from "react";
import { Editor, Input } from "../../../components/Generics";
import { Collapse, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const Experience = ({ title, value, id, language_id, url, translationUrl }) => {
  const editorRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      message.loading({ key: "key", content: "Loading..." });
      const res = await axios.post(
        value === "uz" ? url : translationUrl,
        value === "uz"
          ? {
              title: "string",
              description: "string",
              text: "string",
              person_data_id: id,
            }
          : {
              id: 0,
              title: "string",
              description: "string",
              text: "string",
              person_data_id: id,
              language_id,
              person_experience_id: 0,
            },
        {
          headers: {
            Authorization: ` Bearer ${Cookies.get("token_")}`,
          },
        }
      );
      res.status === 200 &&
        message.success({ key: "key", content: "Muvaffaqiyatli!" });
    } catch (err) {
      message.error({ key: "key", content: "Somthing wend wrong!" });
    }
  };

  const items = [
    {
      key: "1",
      label: title,
      children: (
        <div className="form-group">
          <form onSubmit={handleSubmit} className="row">
            <Input className="form-group col-md-4" label="Title" />
            <Input className="form-group col-md-4" label="Description" />
            <Editor ref={editorRef} className="col-md-4" />
            <div className="col-md-12">
              <button className="btn btn-success" type="submit">
                Create
              </button>
            </div>
          </form>
          <div className="col-md-12 mt-3"></div>
        </div>
      ),
    },
  ];

  return <Collapse items={items} />;
};

export default Experience;
