import { useId } from "../../hooks/useId";
import { lazy } from "react";

const Page = lazy(() => import("../pages/Page/pages"));
const CreatePage = lazy(() => import("../pages/Page/add-page"));
const EditPage = lazy(() => import("../pages/Page/update-page"));

export const page = [
  {
    id: useId(),
    path: "/pages",
    element: <Page />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/pages/create",
    element: <CreatePage />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/pages/edit/:id",
    element: <EditPage />,
    roles: ["admin"],
  },
];
