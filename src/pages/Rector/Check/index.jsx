import React, { useRef, useState } from "react";
import { Btn } from "../style";
import { Input } from "../../../components/Generics";
import axios from "axios";
import { message } from "antd";

const Check = () => {
  const emailRef = useRef();
  const [data, setData] = useState([]);

  const haldleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value) {
      message.error("Email kiritlmagan!");
      return;
    }
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/appealtorector/getallappealtorectoremailstatus/${
          emailRef.current.value
        }`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CAPCHA_TOKEN}`,
          },
        }
      );
      if (res.data?.length) {
        setData(res.data);
      } else {
        throw new Error();
      }
    } catch (err) {
      message.error("Notog'ri email!");
    }
  };

  const getTitle = (e, id) => {
    if (e) {
      return `RV${id} raqamli murojaatga javob berilgan`;
    } else {
      return `RV${id} raqamli murojaat ko‘rib chiqilmoqda`;
    }
  };

  return (
    <div>
      <form onSubmit={haldleSubmit}>
        <Input
          ref={emailRef}
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          required
        />
        <Btn type="submit">Check</Btn>
      </form>
      {data?.length ? (
        <div class="card">
          {data.map((e) => (
            <div key={e.id} className="card-body">
              {getTitle(e.confirm, e.id)}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Check;
