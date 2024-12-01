import { message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Form = ({ id, t }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();
  const captchaRef = useRef();
  const [captcha, setCaptcha] = useState({});

  const getCaptcha = () => {
    fetch(`${import.meta.env.VITE_BASE_URL_API}/captcha/getcaptchanumbers`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_CAPCHA_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setCaptcha(res));
  };

  useEffect(() => {
    getCaptcha();
  }, []);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      message.loading({ key: "appeal", content: "Yuborilmoqda..." });
      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL_API
        }/appealtoemployee/createappealtoemployee/${id}`,
        {
          full_name: nameRef.current.value,
          email: emailRef.current.value,
          subject: subjectRef.current.value,
          message: messageRef.current.value,
          captcha_numbers_sum: Number(captchaRef.current.value),
          captcha_id: captcha?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_CAPCHA_TOKEN}`,
          },
        }
      );

      if (res.status === 200) {
        message.success({ key: "appeal", content: "Muvofaqiyatli yuborlidi!" });
        nameRef.current.value = "";
        emailRef.current.value = "";
        captchaRef.current.value = "";
        subjectRef.current.value = "";
        messageRef.current.value = "";
        getCaptcha();
      } else {
        throw new Error();
      }
    } catch (err) {
      message.error({ key: "appeal", content: "Xatolik!" });
      captchaRef.current.value = "";
      getCaptcha();
    }
  };

  return (
    <div className="container bg-white py-5" id="contact">
      <div className="row px-3">
        <div className="col-12">
          <h2 className="title position-relative pb-2 mb-4">
            {t("employee.appeal")}
          </h2>
        </div>
        <div className="col-12">
          <div className="contact-form">
            <div id="success" />
            <form onSubmit={onFormSubmit}>
              <input
                type="hidden"
                name="_token"
                defaultValue="hQdMwPQM32APAUMopE0csHDDsU5KzEqVeNEnkBrQ"
              />
              <div className="form-row">
                <div className="control-group col-sm-6">
                  <input
                    type="text"
                    className="form-control p-4"
                    id="name"
                    name="name"
                    placeholder={t("employee.name")}
                    required="required"
                    data-validation-required-message="Please enter your name"
                    ref={nameRef}
                  />
                  <p className="help-block text-danger" />
                </div>
                <div className="control-group col-sm-6">
                  <input
                    type="email"
                    className="form-control p-4"
                    id="email"
                    name="email"
                    placeholder={t("employee.email")}
                    required="required"
                    data-validation-required-message="Please enter your email"
                    ref={emailRef}
                  />
                  <p className="help-block text-danger" />
                </div>
              </div>
              <div className="form-row">
                <div className="control-group col-sm-6">
                  <input
                    type="text"
                    className="form-control p-4"
                    id="subject"
                    name="subject"
                    placeholder={t("employee.subject")}
                    required="required"
                    data-validation-required-message="Please enter a subject"
                    ref={subjectRef}
                  />
                  <p className="help-block text-danger" />
                </div>
                <div className="control-group col-sm-6">
                  <input
                    type="text"
                    className="form-control p-4"
                    id="cp"
                    name="cp"
                    placeholder={`${captcha.num1} + ${captcha.num2}`}
                    required="required"
                    data-validation-required-message="Please enter answer"
                    ref={captchaRef}
                  />
                  <p className="help-block text-danger" />
                </div>
              </div>
              <div className="control-group">
                <textarea
                  className="form-control py-3 px-4"
                  rows={5}
                  id="message"
                  name="message"
                  placeholder={t("employee.message")}
                  required="required"
                  data-validation-required-message="Please enter your message"
                  defaultValue={""}
                  ref={messageRef}
                />
                <p className="help-block text-danger" />
              </div>
              <div>
                <button
                  className="btn btn-primary py-3 px-4"
                  type="submit"
                  id="sendMessageButton"
                >
                  {t("employee.appeal")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
