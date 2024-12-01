import React, { useEffect, useRef, useState } from "react";
import { Select, message } from "antd";
import { Input } from "../../../components/Generics";
import { Btn, TextArea } from "../style";
import useAxios from "../../../hooks/useAxios";

const selectStyle = {
  width: "100%",
  height: "40px",
  borderRadius: "3px",
};

const errorSelectStyle = {
  ...selectStyle,
  border: "1px solid red",
  background: "rgba(255, 0, 0, 0.1)",
};

const errorInputStyle = {
  border: "1px solid red",
  background: "rgba(255, 0, 0, 0.1)",
};

const filterOption = (input, option) =>
  (option?.children ?? "").toLowerCase().includes(input.toLowerCase());

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhbGwiLCJyb2xlIjoiQW55IiwibmJmIjoxNzExNjk3MDUxLCJleHAiOjE3MTE2OTcwNTIsImlhdCI6MTcxMTY5NzA1MX0.o64p8lC1PMQDjPsmH6dWR1N-tuyTEG9-v0NHfJVHdlk";

const headers = {
  Authorization: `Bearer ${token}`,
};

const Form = () => {
  const { sendRequest, loading } = useAxios();
  const [other, setOther] = useState(null);
  const [country, setCountry] = useState([]);
  const [teretory, setTeretoriy] = useState([]);
  const [district, setDistrict] = useState([]);
  const [neighbor, setNeighbor] = useState([]);
  const [gender, setGender] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [body, setBody] = useState({
    country_id: null,
    territorie_id: null,
    district_id: null,
    neighborhood_id: null,
  });
  const [capchaNums, setCapchaNums] = useState({});
  const manzilRef = useRef(null);
  const fioRef = useRef(null);
  const dateRef = useRef(null);
  const phone1Ref = useRef(null);
  const phone2Ref = useRef(null);
  const emailRef = useRef(null);
  const fileRef = useRef(null);
  const appealRef = useRef(null);
  const capchaRef = useRef(null);
  const genderRef = useRef(null);
  const statusRef = useRef(null);

  const [genderId, setGenderId] = useState(null);
  const [employeId, setEmployeId] = useState(null);

  const [countryStyle, setCountryStyle] = useState(selectStyle);
  const [terretoryStyle, setTerretoryStyle] = useState(selectStyle);
  const [districtStyle, setDistrictStyle] = useState(selectStyle);
  const [neighborStyle, setNeighborStyle] = useState(selectStyle);
  const [manzilStyle, setManzilStyle] = useState({});
  const [fioStyle, setFioStyle] = useState({});
  const [dateStyle, setDateStyle] = useState({});
  const [sexStyle, setSexStyle] = useState(selectStyle);
  const [workStyle, setWorkStyle] = useState(selectStyle);
  const [phone1Style, setPhone1Style] = useState({});
  const [phone2Style, setPhone2Style] = useState({});
  const [emailStyle, setEmailStyle] = useState({});
  const [appealStyle, setAppealStyle] = useState({});
  const [capchaStyle, setCapchaStyle] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("country_id", body.country_id);
    formData.append("territorie_id", body.territorie_id || "");
    formData.append("district_id", body.district_id || "");
    formData.append("neighborhood_id", body.neighborhood_id || "");
    formData.append("addres", manzilRef?.current?.value);
    formData.append("fio_", fioRef?.current?.value);
    formData.append("brithday", dateRef?.current?.value);
    formData.append("gender_id", genderId);
    formData.append("employe_id", employeId);
    formData.append("telephone_number_one", phone1Ref?.current?.value);
    formData.append("telephone_number_two", phone2Ref?.current?.value);
    formData.append("email", emailRef?.current?.value);
    formData.append("appeal", appealRef?.current?.value);
    formData.append("captcha_numbers_sum", capchaRef?.current?.value);
    formData.append("file_upload_", fileRef.current.files[0] || null);
    formData.append("captcha_id", capchaNums?.id);

    !body.country_id && setCountryStyle(errorSelectStyle);
    !body.district_id && setDistrictStyle(errorSelectStyle);
    !body.territorie_id && setTerretoryStyle(errorSelectStyle);
    !body.neighborhood_id && setNeighborStyle(errorSelectStyle);
    !genderId && setSexStyle(errorSelectStyle);
    !employeId && setWorkStyle(errorSelectStyle);

    !manzilRef?.current?.value && setManzilStyle(errorInputStyle);
    !fioRef?.current?.value && setFioStyle(errorInputStyle);
    !dateRef?.current?.value && setDateStyle(errorInputStyle);
    !phone1Ref?.current?.value && setPhone1Style(errorInputStyle);
    !phone2Ref?.current?.value && setPhone2Style(errorInputStyle);
    !emailRef?.current?.value && setEmailStyle(errorInputStyle);
    !appealRef?.current?.value && setAppealStyle(errorInputStyle);
    !capchaRef?.current?.value && setCapchaStyle(errorInputStyle);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/appealtorector/createappealtorector`,
        {
          method: "POST",
          headers: {
            ...headers,
          },
          body: formData,
        }
      );
      const responseData = await response.json();
      if (responseData.statusCode === 200) {
        message.success({ key: "key", content: "Successfully sent!" });
        setBody({
          country_id: null,
          territorie_id: null,
          district_id: null,
          neighborhood_id: null,
        });
        setTeretoriy([]);
        setDistrict([]);
        setNeighbor([]);
        setEmployeId(null);
        setGenderId(null);
        manzilRef.current.value = null;
        fioRef.current.value = null;
        dateRef.current.value = null;
        phone1Ref.current.value = null;
        phone2Ref.current.value = null;
        emailRef.current.value = null;
        appealRef.current.value = null;
        capchaRef.current.value = null;
        fileRef.current.value = null;
      } else {
        capchaRef.current.value = null;
        throw new Error();
      }
    } catch (er) {
      message.error({ key: "key", content: "Xatolik!" });
    }
    getCapchaNums();
  };

  const getCountry = async () => {
    try {
      const response = await sendRequest({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL_API}/country/sitegetallcountry`,
      });
      setCountry(response?.data);
    } catch (err) {}
  };

  const getGender = async () => {
    try {
      const response = await sendRequest({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL_API}/gender/sitegetallgender`,
      });
      setGender(response?.data);
    } catch (err) {}
  };

  const getEmployment = async () => {
    try {
      const response = await sendRequest({
        method: "get",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/employment/sitegetallemployment`,
      });
      setEmployment(response?.data);
    } catch (err) {}
  };

  const onCountryChange = async (value) => {
    setOther(value);
    setCountryStyle(selectStyle);
    try {
      const response = await sendRequest({
        method: "get",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/territorie/sitegetallterritorie?country_id=${value}`,
      });
      setTeretoriy(response?.data);
      setBody({ ...body, country_id: value });
    } catch (err) {
      setTeretoriy([]);
    }
  };

  const onTerretoryChange = async (value) => {
    setTerretoryStyle(selectStyle);
    try {
      const response = await sendRequest({
        method: "get",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/district/sitegetalldistrict?territorie_id=${value}`,
      });
      setDistrict(response?.data);
      setBody({ ...body, territorie_id: value });
    } catch (err) {
      setDistrict([]);
    }
  };

  const onDistrictChange = async (value) => {
    setDistrictStyle(selectStyle);
    try {
      const response = await sendRequest({
        method: "get",
        url: `${
          import.meta.env.VITE_BASE_URL_API
        }/neighborhood/sitegetallneighborhood?district_id=${value}`,
      });
      setNeighbor(response?.data);
      setBody({ ...body, district_id: value });
    } catch (err) {
      setNeighbor([]);
    }
  };

  const getCapchaNums = async () => {
    try {
      const response = await sendRequest({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL_API}/captcha/getcaptchanumbers`,
        headers,
      });
      setCapchaNums(response.data);
    } catch (err) {}
  };

  const onNeighborChange = (value) => {
    setBody({ ...body, neighborhood_id: value });
    setNeighborStyle(selectStyle);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCountry();
    getGender();
    getEmployment();
    getCapchaNums();
  }, []);

  const onEmployeeChange = (value) => {
    setEmployeId(value);
    setWorkStyle(selectStyle);
  };

  const onGenderChange = (value) => {
    setGenderId(value);
    setSexStyle(selectStyle);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="content__right__form"
      data-aos="fade-up"
    >
      <div className="content__right__form__item">
        <Select
          showSearch
          placeholder="Mamlakat"
          optionFilterProp="children"
          filterOption={filterOption}
          style={countryStyle}
          onChange={onCountryChange}
          value={body.country_id}
        >
          {country?.length &&
            country.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.title}
              </Select.Option>
            ))}
        </Select>
        {other !== 2 && (
          <Select
            showSearch
            placeholder="Viloyat"
            optionFilterProp="children"
            filterOption={filterOption}
            disabled={teretory.length ? false : true}
            onChange={onTerretoryChange}
            style={terretoryStyle}
            value={body.territorie_id}
          >
            {teretory?.length &&
              teretory?.map((e) => (
                <Select.Option key={e.id} value={e.id}>
                  {e.title}
                </Select.Option>
              ))}
          </Select>
        )}
      </div>
      {other !== 2 && (
        <div className="content__right__form__item">
          <Select
            showSearch
            placeholder="Tuman/Shahar"
            optionFilterProp="children"
            filterOption={filterOption}
            disabled={district.length ? false : true}
            style={districtStyle}
            onChange={onDistrictChange}
            value={body.district_id}
          >
            {district?.length &&
              district?.map((e) => (
                <Select.Option key={e.id} value={e.id}>
                  {e.title}
                </Select.Option>
              ))}
          </Select>
          <Select
            showSearch
            placeholder="Mahalla"
            optionFilterProp="children"
            filterOption={filterOption}
            disabled={neighbor.length ? false : true}
            style={neighborStyle}
            onChange={onNeighborChange}
            value={body.neighborhood_id}
          >
            {neighbor?.length &&
              neighbor?.map((e) => (
                <Select.Option key={e.id} value={e.id}>
                  {e.title}
                </Select.Option>
              ))}
          </Select>
        </div>
      )}
      <Input
        style={manzilStyle}
        type="text"
        ref={manzilRef}
        placeholder={"Manzil:"}
        onFocus={() => setManzilStyle({})}
      />
      <div className="content__right__form__item">
        <Input
          style={fioStyle}
          type={"text"}
          ref={fioRef}
          placeholder={"F.I.O"}
          onFocus={() => setFioStyle({})}
        />
        <Input
          style={dateStyle}
          type={"date"}
          ref={dateRef}
          onFocus={() => setDateStyle({})}
        />
      </div>
      <div className="content__right__form__item">
        <Select
          ref={genderRef}
          style={sexStyle}
          placeholder={"Jinsi"}
          name="gender_id"
          onChange={onGenderChange}
          value={genderId}
        >
          {gender.map((e) => (
            <Select.Option key={e.id} value={e.id}>
              {e.gender}
            </Select.Option>
          ))}
        </Select>
        <Select
          ref={statusRef}
          style={workStyle}
          placeholder={"Bandligi"}
          name="employe_id"
          onChange={onEmployeeChange}
          value={employeId}
        >
          {employment.map((e) => (
            <Select.Option key={e.id} value={e.id}>
              {e.title}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="content__right__form__item">
        <Input
          type="text"
          placeholder={"Telefon raqami:+99899 999 99 99"}
          ref={phone1Ref}
          style={phone1Style}
          onFocus={() => setPhone1Style({})}
        />
        <Input
          type="text"
          ref={phone2Ref}
          placeholder={"Qo‘shimcha telefon raqami:+99899 999 99 99"}
          style={phone2Style}
          onFocus={() => setPhone2Style({})}
        />
      </div>
      <div className="content__right__form__item">
        <Input
          type={"text"}
          ref={emailRef}
          style={emailStyle}
          placeholder={"Email"}
          onFocus={() => setEmailStyle({})}
        />
        <Input
          type={"file"}
          ref={fileRef}
          placeholder={"Yuborish uchun faylni tanlang"}
        />
      </div>
      <div className="content__right__form__item">
        <TextArea
          ref={appealRef}
          style={appealStyle}
          placeholder="Murojat yo‘llash"
          onFocus={() => setAppealStyle({})}
        ></TextArea>
      </div>
      <Input
        ref={capchaRef}
        style={capchaStyle}
        type="text"
        placeholder={`${capchaNums?.num1} + ${capchaNums?.num2} = ?`}
        onFocus={() => setCapchaStyle({})}
      />
      <Btn type="primary"> {loading ? "loading" : "Yuborish"}</Btn>
    </form>
  );
};

export default Form;
