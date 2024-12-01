import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

export const useCreate = async (
  value,
  type,
  data,
  url,
  translationUrl,
  uzid,
  append,
  del,
  status
) => {
  try {
    message.loading({
      key: "key",
      content: "Loading...",
    });
    if (value !== "uz") {
      const res = await sendRequest(url, data);

      type === "formData"
        ? data.append(uzid, Number(res?.id))
        : (data[uzid] = Number(res?.id));

      if (append.length) {
        append.forEach((item) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          type === "formData" ? data.append(key, value) : (data[key] = value);
        });
      }

      if (del?.length)
        del?.forEach((e) => {
          type === "obj" ? delete data[e] : data.delete(e);
        });

      let response;

      if (status === 415) {
        const obj = {};
        data.forEach((value, key) => {
          obj[key] = Number(value) || value;
        });
        response = await sendRequest(translationUrl, obj);
      } else {
        response = await sendRequest(translationUrl, data);
      }
      handleResponse(response);
      return response;
    } else {
      const response = await sendRequest(url, data);
      handleResponse(response);
      return response;
    }
  } catch (err) {
    message.error({
      key: "key",
      content: "This is an error message",
    });
  }
};

async function sendRequest(url, data) {
  const response = await axios({
    method: "POST",
    url,
    headers: {
      Authorization: `Bearer ${Cookies.get("_token")}`,
    },
    data: data,
  });
  return response?.data;
}

function handleResponse(response) {
  if (response?.statusCode === 200) {
    message.success({ key: "key", content: "Successfully created!" });
  } else {
    throw new Error("Error in response");
  }
}
