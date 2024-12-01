import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/Wrapper";
import { Input, Select } from "../../../components/Generics";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useDepartmentContext } from "../../../context/DepartmentContext";

const Create110 = () => {
  const { departmentOptions, getSelectDepartment } = useDepartmentContext();
  const [parentOptions, setParentOptions] = useState([]);

  const [parent, setParent] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [score, setScore] = useState(null);
  const [ind1, setInd1] = useState(true);
  const [author, setAuthor] = useState(true);

  const [mock, setMock] = useState([
    {
      sequence_number: 1,
      profil_user_id: 0,
    },
  ]);

  const handleSelectChange = (index, newValue) => {
    const updatedMock = [...mock];
    updatedMock[index].profil_user_id = newValue;
    setMock(updatedMock);
  };

  const handleInputChange = (index, newValue) => {
    const updatedMock = [...mock];
    updatedMock[index].sequence_number = Number(newValue);
    setMock(updatedMock);
  };

  async function handleSubmit(e) {
    message.loading({ key: "sub", content: "Loading..." });
    e.preventDefault();

    try {
      if (!title) {
        throw new Error();
      }
      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/documentteacher110controller/createdocumentteacher110`,
        {
          title,
          parent_id: parent,
          indicator: ind1,
          max_score: score,
          description: desc,
          document_sequence: mock,
          avtor: author,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("_token")}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "sub", content: "Muvaffaqiyatli!" });
        setTitle("");
        setDesc("");
        setParent(parentOptions[0].value);
        setScore(null);
        setInd1(true);
        setAuthor(true);
        setMock([
          {
            sequence_number: 1,
            profil_user_id: 0,
          },
        ]);
      }
    } catch (err) {
      message.error({ key: "sub", content: "Xatolik!" });
    }
  }

  const bool = [
    { value: true, label: "true" },
    { value: false, label: "false" },
  ];

  useEffect(() => {
    getSelectDepartment("uz");
    fetch(
      `${
        import.meta.env.VITE_BASE_URL_API
      }/documentteacher110controller/getalldocumentteacher110select`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("_token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res.map((e) => ({ label: e.title, value: e.id })))
      .then((res) => {
        setParentOptions(res);
        setParent(res[0].value);
      });
  }, []);

  return (
    <Wrapper title="Create Teacher 110">
      <form className="form-horizontal row" onSubmit={handleSubmit}>
        <Input
          className="form-group col-md-6"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          className="form-group col-md-6"
          label="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Select
          className="form-group col-md-3"
          label="Parent"
          options={[{ label: "Parent", value: 0 }, ...parentOptions]}
          value={parent}
          onChange={(e) => setParent(e)}
          showSearch={true}
        />
        <Input
          className="form-group col-md-3"
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          label="Ball"
        />

        <Select
          className="form-group col-md-3"
          label="Indicator 1"
          options={bool}
          value={ind1}
          onChange={(e) => setInd1(e)}
        />
        <Select
          className="form-group col-md-3"
          label="Avtor"
          options={bool}
          value={author}
          onChange={(e) => setAuthor(e)}
        />
        <div className="row col-md-11">
          {mock.map((e, index) => (
            <div className="row col-md-12" key={index}>
              <Select
                className="form-group col-md-6"
                label={`User Profile ${index + 1}`}
                options={departmentOptions}
                value={e.profil_user_id}
                onChange={(e) => handleSelectChange(index, e)}
                showSearch={true}
              />
              <Input
                className={
                  index === 0 ? "form-group col-md-6" : "form-group col-md-5"
                }
                type="number"
                label={`Sequence Number ${index + 1}`}
                value={e.sequence_number}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              {index !== 0 && (
                <div className="col-md-1">
                  <label className="col-sm-12 col-form-label">Delete</label>
                  <div className="col-sm-12">
                    <button
                      type="button"
                      onClick={() =>
                        setMock(mock.filter((e, count) => count !== index))
                      }
                      className="btn btn-danger w-100"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="col-md-1">
          <label className="col-sm-12 col-form-label">Add</label>
          <div className="col-sm-12">
            <button
              type="button"
              onClick={() =>
                setMock([
                  ...mock,
                  {
                    sequence_number: mock[mock.length - 1].sequence_number + 1,
                    profil_user_id: 0,
                  },
                ])
              }
              className="btn btn-primary w-100"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="form-group mt-3 col-md-12">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-success">
              Create
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Create110;
