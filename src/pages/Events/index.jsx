import React, { useEffect } from "react";
import BlogPage from "./../../components/BlogPage/index";
import { useBlog } from "../../hooks/useBog";
import Loading2 from "../../components/Loading2";

const Events = () => {
  const { data, loading, error, page, setPage } = useBlog(
    "Kutilayotgan tadbirlar",
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

  return (
    <BlogPage title="events.title" data={data} page={page} setPage={setPage} />
  );
};

export default Events;
