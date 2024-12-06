import { useId } from "../../hooks/useId";
import { lazy } from "react";

const Users = lazy(() => import("../pages/User/users"));
const UserCreate = lazy(() => import("../pages/User/add-user"));
const UserEdit = lazy(() => import("../pages/User/update-user"));

const UserType = lazy(() => import("../pages/Crud/UserType/user-type"));
const UserTypeCreate = lazy(() =>
  import("../pages/Crud/UserType/add-user-type")
);
const UserTypeEdit = lazy(() =>
  import("../pages/Crud/UserType/update-user-type")
);

export const user = [
  {
    id: useId(),
    path: "/usertype",
    element: <UserType />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/usertype/create",
    element: <UserTypeCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/usertype/edit/:id",
    element: <UserTypeEdit />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/users",
    element: <Users />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/users/create",
    element: <UserCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/users/edit/:id",
    element: <UserEdit />,
    roles: ["admin"],
  },
];
