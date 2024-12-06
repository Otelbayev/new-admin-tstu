import { useId } from "../../hooks/useId";
import { lazy } from "react";

const MudirPortfolio = lazy(() =>
  import("../pages/Mudir/TeacherConfirm/portfolio")
);
const MudirBlog = lazy(() => import("../pages/Mudir/TeacherConfirm/blog"));
const MudirScience = lazy(() =>
  import("../pages/Mudir/TeacherConfirm/science")
);
const MudirExprience = lazy(() =>
  import("../pages/Mudir/TeacherConfirm/exprience")
);

const BlogsTable = lazy(() =>
  import("../pages/Mudir/TeacherConfirm/blogs-table")
);
const PortfolioTable = lazy(() =>
  import("../pages/Mudir/TeacherConfirm/portfolio-tables")
);
const ScienceTable = lazy(() =>
  import("../pages/Mudir/TeacherConfirm/science-tables")
);
const ExprienceTable = lazy(() =>
  import("../pages/Mudir/TeacherConfirm/exprience-tables")
);

export const mudir = [
  {
    id: useId(),
    path: "confirm-portfolio",
    element: <MudirPortfolio />,
    roles: ["headdepartment"],
  },
  {
    id: useId(),
    path: "confirm-blog",
    element: <MudirBlog />,
    roles: ["headdepartment"],
  },
  {
    id: useId(),
    path: "confirm-exprience",
    element: <MudirExprience />,
    roles: ["headdepartment"],
  },
  {
    id: useId(),
    path: "confirm-science",
    element: <MudirScience />,
    roles: ["headdepartment"],
  },
  {
    id: useId(),
    path: "confirm-portfolio/:id",
    element: <PortfolioTable />,
    roles: ["headdepartment"],
  },
  {
    id: useId(),
    path: "confirm-blog/:id",
    element: <BlogsTable />,
    roles: ["headdepartment"],
  },
  {
    id: useId(),
    path: "confirm-exprience/:id",
    element: <ExprienceTable />,
    roles: ["headdepartment"],
  },
  {
    id: useId(),
    path: "confirm-science/:id",
    element: <ScienceTable />,
    roles: ["headdepartment"],
  },
];
