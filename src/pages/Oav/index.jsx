import React, { useEffect } from "react";
import BlogPage from "../../components/BlogPage";
import { useBlog } from "../../hooks/useBog";
import Loading2 from "../../components/Loading2";

const Oav = () => {
  const { data, loading, error, page, setPage } = useBlog(
    "OAV biz haqimizda",
    false,
    true
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (loading) {
    return <Loading2 />;
  }

  if (!loading && error) {
    return <h1 className="text-center">Xatolik!</h1>;
  }

  return <BlogPage data={data} page={page} setPage={setPage} title={"oav"} />;
};

export default Oav;
