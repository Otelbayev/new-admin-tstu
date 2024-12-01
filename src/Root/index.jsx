import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { navbar, noshowcase, routes } from "../utils/navbar";
import Universal from "../components/Universal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../components/Loading";
const HomePage = lazy(() => import("../pages/Home"));
import Admin from "../Admin";
import Loading2 from "../components/Loading2";

const Root = () => {
  const paths = window.location.pathname.split("/");

  useEffect(() => {
    if (paths.includes("admission")) {
      window.location.href = `http://sayt.tstu.uz/admission`;
    }
    // if (paths.includes("admission_foreign")) {
    //   window.location.href = `http://sayt.tstu.uz/admission_foreign`;
    // }
    if (paths.includes("rentapartment")) {
      window.location.href = `http://sayt.tstu.uz/rentapartment`;
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        }
      />
      {/* <Route
        path="/uz"
        element={
          <Navigate to={`/${urlObject?.search ? urlObject?.search : ""}`} />
        }
      /> */}
      {routes.map(({ id, path, element }) => (
        <Route
          key={id}
          path={`/:lang/${path}`}
          element={
            <Suspense fallback={<Loading height={true} />}>{element}</Suspense>
          }
        />
      ))}
      <Route element={<Universal />}>
        {navbar.map((item) => (
          <Route
            key={item.id}
            path={`/:lang/${item.path}`}
            element={
              <Suspense fallback={<Loading2 />}>{item.element}</Suspense>
            }
          />
        ))}
      </Route>
      <Route element={<Universal />}>
        {noshowcase.map((item) => (
          <Route
            key={item.id}
            path={`/:lang/${item.path}`}
            element={
              <Suspense fallback={<Loading2 />}>{item.element}</Suspense>
            }
          />
        ))}
      </Route>
      <Route path={"/:lang/admin/*"} element={<Admin />} />
    </Routes>
  );
};

export default Root;
