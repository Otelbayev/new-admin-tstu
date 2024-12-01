import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAxios from "./../../../hooks/useAxios";

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

const BlogProvider = ({ children }) => {
  const { sendRequest } = useAxios();
  const token = `Bearer ${Cookies.get("_token")}`;
  const [blogs, setBlogs] = useState([]);
  const [blogCategoryOptions, setBlogCategoryOptions] = useState([]);
  const [isCreateBlogCategory, setIsCreateBlogCategory] = useState(false);
  const [isDeleteBlogCategory, setIsDeleteBlogCategory] = useState(false);

  async function getAllBlogs(value) {
    const response = await sendRequest({
      method: "get",
      url:
        value === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/blogcontroller/getallblogselect`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/blogcontroller/getallblogtranslationselect/${value}`,
      headers: {
        Authorization: token,
      },
    });

    if (response.status === 200) {
      setBlogs([
        { value: 0, label: "Blog", parent: null },
        ...response.data
          .sort((a, b) => a.id - b.id)
          .map((e) => ({ value: e.id, label: e.title, parent: e?.blog_id })),
      ]);
    }
  }

  async function getBlogCategorySelect(value) {
    const res = await sendRequest({
      method: "get",
      url:
        value === "uz"
          ? `${
              import.meta.env.VITE_BASE_URL_API
            }/blogcategorycontroller/sitegetallblogcategory`
          : `${
              import.meta.env.VITE_BASE_URL_API
            }/blogcategorycontroller/sitegetallblogcategorytranslation?language_code=${value}`,
      headers: {
        Authorization: token,
      },
    });
    res.status === 200 &&
      setBlogCategoryOptions(
        res.data
          .sort((a, b) => a.id - b.id)
          .map((e) => ({
            value: e.id,
            label: e.title,
            parent: e?.blog_category_id,
          }))
      );
  }

  return (
    <BlogContext.Provider
      value={{
        blogs,
        getAllBlogs,
        blogCategoryOptions,
        getBlogCategorySelect,
        isCreateBlogCategory,
        setIsCreateBlogCategory,
        isDeleteBlogCategory,
        setIsDeleteBlogCategory,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
