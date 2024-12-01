import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/router";
import Uni from "../components/Uni";
import PrivateRoute from "../utils/PrivateRoute";
import NotFound from "../pages/NotFound";
import File from "../pages/Appeals/File";
import AdminContext from "../context";
import Loading from "../components/Loading";
import Cookies from "js-cookie";

const Root = () => {
  const role = Cookies.get("role");

  return (
    <AdminContext>
      <Routes>
        <Route element={<Uni />}>
          {routes.map(({ id, path, element, roles }) => {
            if (roles?.includes(role) || roles[0] === "*") {
              return (
                <Route key={id} element={<PrivateRoute />}>
                  <Route
                    path={path}
                    element={
                      <Suspense fallback={<Loading />}>{element}</Suspense>
                    }
                  />
                </Route>
              );
            }
          })}
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/appeals/:id" element={<File />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AdminContext>
  );
};

export default Root;
