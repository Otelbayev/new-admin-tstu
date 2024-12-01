import axios from "axios";
import React, { useEffect, useState } from "react";
import { Content } from "./style";

const Favorites = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL_API}/blogcontroller/sitegetallblog"
    );
    res.status === 200 && setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div></div>;
};

export default Favorites;
