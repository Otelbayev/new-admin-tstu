import { createContext, useContext, useState } from "react";

const BlogCacheContext = createContext();

export const useBlogCacheContext = () => useContext(BlogCacheContext);

const BlogCacheContextProvider = ({ children }) => {
  const [blogCache, setBlogCache] = useState([]);

  return (
    <BlogCacheContext.Provider value={{ blogCache, setBlogCache }}>
      {children}
    </BlogCacheContext.Provider>
  );
};

export default BlogCacheContextProvider;
