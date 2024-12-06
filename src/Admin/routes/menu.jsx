import { useId } from "../../hooks/useId";
import { lazy } from "react";

const Menu = lazy(() => import("../pages/Menu/menu"));
const CreateMenu = lazy(() => import("../pages/Menu/add-menu"));
const EditMenu = lazy(() => import("../pages/Menu/update-menu"));

const MenuType = lazy(() => import("../pages/Crud/MenuType/menu-type"));
const MenuTypeCreate = lazy(() =>
  import("../pages/Crud/MenuType/add-menu-type")
);
const MenuTypeEdit = lazy(() =>
  import("../pages/Crud/MenuType/update-menu-type")
);

export const menu = [
  {
    id: useId(),
    path: "/menu",
    element: <Menu />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/menu/create",
    element: <CreateMenu />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/menu/edit/:id",
    element: <EditMenu />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/menutype",
    element: <MenuType />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/menutype/create",
    element: <MenuTypeCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/menutype/edit/:id",
    element: <MenuTypeEdit />,
    roles: ["admin"],
  },
];
