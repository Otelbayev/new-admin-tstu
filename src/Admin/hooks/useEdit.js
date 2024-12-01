import { message } from "antd";
import Cookies from "js-cookie";
import axios from "axios";

export const useEdit = async (
  isCreate,
  value,
  type,
  id,
  transId,
  data,
  url,
  translationUrl,
  append,
  del,
  createApi,
  createAppend,
  deleteApi,
  status,
  isParam
) => {
  try {
    message.loading({ key: "key", content: "Loading!" });

    if (!isCreate) {
      if (value === "uz") {
        const param =
          type === "formData" ? Object.fromEntries(data.entries()) : data;

        const res = await fetchRequest(
          `${url}/${id}`,
          data,
          "put",
          isParam && param
        );
        handleResponse(res);
        return res;
      } else {
        if (append.length)
          append.forEach((item) => {
            const key = Object.keys(item)[0];
            const value = item[key];
            type == "formData" ? data.append(key, value) : (data[key] = value);
          });

        if (del?.length)
          del?.forEach((e) => {
            type === "obj" ? delete data[e] : data?.delete(e);
          });

        let res;
        const param =
          type === "formData" ? Object.fromEntries(data.entries()) : data;

        if (status === 415) {
          const obj = {};
          data.forEach((value, key) => {
            obj[key] = Number(value) || value;
          });
          res = await fetchRequest(
            `${translationUrl}/${transId}`,
            obj,
            "put",
            isParam && obj
          );
        } else {
          res = await fetchRequest(
            `${translationUrl}/${transId}`,
            data,
            "put",
            isParam && param
          );
        }

        handleResponse(res);
        return res;
      }
    } else {
      if (createAppend.length)
        createAppend.forEach((item) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          type === "formData" ? data.append(key, value) : (data[key] = value);
        });

      if (deleteApi?.length)
        deleteApi?.forEach((e) => {
          type === "obj" ? delete data[e] : data.delete(e);
        });

      let res;

      if (status === 415) {
        const obj = {};
        data.forEach((value, key) => {
          obj[key] = Number(value) || value;
        });
        res = await fetchRequest(createApi, obj, "post");
      } else {
        res = await fetchRequest(createApi, data, "post");
      }

      handleResponse(res);
      return res;
    }
  } catch (err) {
    message.error({ key: "key", content: "Xatolik!" });
  }
};

async function fetchRequest(url, data, method, params) {
  const res = await axios({
    method,
    url,
    headers: {
      Authorization: `Bearer ${Cookies.get("_token")}`,
    },
    data: data,
    params,
  });
  return res;
}

function handleResponse(response) {
  if (response?.status === 200) {
    message.success({ key: "key", content: "Muvaffaqiyatli o'zgartirildi!" });
  } else {
    throw new Error("Error in response");
  }
}
