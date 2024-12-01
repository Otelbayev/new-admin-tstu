import React, { useEffect } from "react";
import { useBlog } from "../../hooks/useBog";
import BlogPage from "../../components/BlogPage";
import Loading2 from "../../components/Loading2";

const Announcements = () => {
  const { data, loading, error, page, setPage } = useBlog("E'lon", false, true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (loading) {
    return <Loading2 />;
  }

  if (!loading && error) {
    return <h1 className="text-center">Xatolik!</h1>;
  }

  return <BlogPage title="elon" data={data} page={page} setPage={setPage} />;
};

export default Announcements;
