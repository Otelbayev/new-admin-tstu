import { useId } from "../../hooks/useId";
import { lazy } from "react";

const Person = lazy(() => import("../pages/Employee/empoyee"));
const CreateEmployee = lazy(() => import("../pages/Employee/add-employee"));
const EditEmployee = lazy(() => import("../pages/Employee/update-employee"));
const Employment = lazy(() => import("../pages/Crud/Employment/employment"));
const EmploymentCreate = lazy(() =>
  import("../pages/Crud/Employment/add-employment")
);
const EmploymentEdit = lazy(() =>
  import("../pages/Crud/Employment/update-employment")
);

const EmployeeType = lazy(() =>
  import("../pages/Crud/EmployeeType/employee-type")
);
const EmployeeTypeCreate = lazy(() =>
  import("../pages/Crud/EmployeeType/add-employee-type")
);
const EmployeeTypeEdit = lazy(() =>
  import("../pages/Crud/EmployeeType/update-employee-type")
);

export const employee = [
  {
    id: useId(),
    path: "/employee",
    element: <Person />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/employee/create",
    element: <CreateEmployee />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/employee/edit/:id",
    element: <EditEmployee />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/employment",
    element: <Employment />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/employment/create",
    element: <EmploymentCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/employment/edit/:id",
    element: <EmploymentEdit />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/employeetype",
    element: <EmployeeType />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/employeetype/create",
    element: <EmployeeTypeCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/employeetype/edit/:id",
    element: <EmployeeTypeEdit />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/my-data",
    element: <EditEmployee />,
    roles: ["*"],
  },
];
