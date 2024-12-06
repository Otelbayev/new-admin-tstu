import { useId } from "../../hooks/useId";
import { lazy } from "react";

const Rectorat = lazy(() => import("../pages/Rectorat"));
const RectoratEdit = lazy(() => import("../pages/Rectorat/edit"));
const Appeals = lazy(() => import("../pages/Appeals"));

export const rectorat = [
  {
    id: useId(),
    path: "/appeals",
    element: <Appeals />,
    roles: ["admin", "virtualreception"],
  },
  {
    id: useId(),
    path: "rectorat",
    element: <Rectorat />,
    roles: ["moderatorcontent"],
  },

  {
    id: useId(),
    path: "rectorat/edit/:id",
    element: <RectoratEdit />,
    roles: ["moderatorcontent"],
  },
];
