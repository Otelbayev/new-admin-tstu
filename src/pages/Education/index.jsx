import React, { useEffect } from "react";
import { useBlog } from "./../../hooks/useBog";
import BlogPage from "../../components/BlogPage";
import Loading2 from "../../components/Loading2";

const Education = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, loading, error } = useBlog("Ta‘lim", false, true);

  if (loading) {
    return <Loading2 />;
  }

  if (!loading && error) {
    return <h1 className="text-center">Xatolik!</h1>;
  }

  return <BlogPage title="talim.title" data={data} />;
};

export default Education;
