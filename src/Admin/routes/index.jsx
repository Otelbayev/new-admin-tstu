import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useId } from "../../hooks/useId";
import { asset } from "./asset";
import { blog } from "./blog";
import { department } from "./department";
import { employee } from "./employee";
import { menu } from "./menu";
import { mudir } from "./mudir";
import { page } from "./page";
import { teacher } from "./teacher";
import { daily } from "./teacher-daily";
import { user } from "./user";
import { rectorat } from "./rectorat";
import { crud } from "./crud";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));

export const routes = [
  {
    id: useId(),
    path: "/",
    element: <Navigate to="home" />,
    roles: ["*"],
  },
  {
    id: useId(),
    path: "/home",
    element: <Home />,
    roles: ["*"],
  },

  {
    id: useId(),
    path: "/profile",
    element: <Profile />,
    roles: ["*"],
  },
  ...blog,
  ...department,
  ...menu,
  ...page,
  ...employee,
  ...user,
  ...teacher,
  ...daily,
  ...asset,
  ...mudir,
  ...rectorat,
  ...crud,
];
