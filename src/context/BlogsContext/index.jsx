import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const BlogsContext = createContext();

export const useBlogsContext = () => useContext(BlogsContext);

const BlogsContextProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const [blogs, setBlogs] = useState({ list: [] });
  const [news, setNews] = useState({ list: [] });
  const [xalqaro, setXalqaro] = useState({ list: [] });
  const [dissertatsiya, setDissertatsiya] = useState({ list: [] });
  const [topNews, setTopNews] = useState({ list: [] });
  const [events, setEvnts] = useState({ list: [] });
  const [talims, setTalims] = useState({ list: [] });
  const [talaba, setTalaba] = useState({ list: [] });

  useEffect(() => {
    setBlogs({
      list: [
        ...news.list,
        ...xalqaro.list,
        ...dissertatsiya.list,
        ...topNews.list,
        ...events.list,
        ...talims.list,
        ...talaba.list,
      ],
    });
  }, [news, xalqaro, dissertatsiya, topNews, events, talims, talaba]);

  // useEffect(() => {
  //   setNews({ list: [] });
  //   setXalqaro({ list: [] });
  //   setDissertatsiya({ list: [] });
  //   setTopNews({ list: [] });
  //   setEvnts({ list: [] });
  //   setTalims({ list: [] });
  //   setTalaba({ list: [] });
  //   setBlogs({ list: [] });
  // }, [i18n.language]);

  return (
    <BlogsContext.Provider
      value={{
        blogs,
        setBlogs,
        news,
        setNews,
        xalqaro,
        setXalqaro,
        dissertatsiya,
        setDissertatsiya,
        topNews,
        setTopNews,
        events,
        setEvnts,
        talims,
        setTalims,
        talaba,
        setTalaba,
      }}
    >
      {children}
    </BlogsContext.Provider>
  );
};

export default BlogsContextProvider;
