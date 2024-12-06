import { useId } from "../../hooks/useId";
import { lazy } from "react";

const Department = lazy(() => import("../pages/Department/department"));
const DepartmentCreate = lazy(() =>
  import("../pages/Department/add-department")
);
const DepartmentEdit = lazy(() =>
  import("../pages/Department/update-department")
);

const DepartmentType = lazy(() =>
  import("../pages/Crud/DepartmentType/department-type")
);
const DepartmentTypeCreate = lazy(() =>
  import("../pages/Crud/DepartmentType/add-department-type")
);
const DepartmentTypeEdit = lazy(() =>
  import("../pages/Crud/DepartmentType/update-department-type")
);
const ProfileDep = lazy(() => import("../pages/ProfileDep"));

export const department = [
  {
    id: useId(),
    path: "/department/:type",
    element: <Department />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/department/create",
    element: <DepartmentCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/department/edit/:id",
    element: <DepartmentEdit />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/departmenttype",
    element: <DepartmentType />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/departmenttype/create",
    element: <DepartmentTypeCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/departmenttype/edit/:id",
    element: <DepartmentTypeEdit />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "department",
    element: <ProfileDep />,
    roles: ["dean", "deputydean", "headdepartment", "director"],
  },
];
