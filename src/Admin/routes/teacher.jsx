import { useId } from "../../hooks/useId";
import { lazy } from "react";

const TeacherDoc = lazy(() => import("../pages/Teacher/FileImport"));

const Crud110 = lazy(() => import("../pages/Crud/DocCrud110/doc-110"));
const Create110 = lazy(() => import("../pages/Crud/DocCrud110/create-doc-110"));
const Edit110 = lazy(() => import("../pages/Crud/DocCrud110/update-doc-110"));

const TeacherPortfolio = lazy(() => import("../pages/Teacher/Portfolio"));
const TeacherPortfolioCreate = lazy(() =>
  import("../pages/Teacher/Portfolio/create")
);
const TeacherPortfolioEdit = lazy(() =>
  import("../pages/Teacher/Portfolio/edit")
);

const TeacherBlog = lazy(() => import("../pages/Teacher/Blog"));
const TeacherBlogCreate = lazy(() => import("../pages/Teacher/Blog/create"));
const TeacherBlogEdit = lazy(() => import("../pages/Teacher/Blog/edit"));

const TeacherExCreate = lazy(() =>
  import("../pages/Teacher/experience-create")
);
const TeacherExEdit = lazy(() => import("../pages/Teacher/experience-edit"));
const TeacherEx = lazy(() => import("../pages/Teacher/experience"));

const TeacherSa = lazy(() => import("../pages/Teacher/Science"));
const TeacherSaCreate = lazy(() => import("../pages/Teacher/Science/create"));
const TeacherSaEdit = lazy(() => import("../pages/Teacher/Science/edit"));

const AppealTeacher = lazy(() => import("../pages/Teacher/appeal"));

const Mudir = lazy(() => import("../pages/Mudir/mudir"));

const ConfirmTeacher = lazy(() => import("../pages/Mudir/confirm"));

const StudyDepartment = lazy(() => import("../pages/Study"));
const StudyDepartmentID = lazy(() => import("../pages/Study/study-dep"));
const FacultyCouncil = lazy(() => import("../pages/FacultyCouncil"));
const FacultyCouncilID = lazy(() =>
  import("../pages/FacultyCouncil/concil-id")
);

export const teacher = [
  {
    id: useId(),
    path: "import-doc",
    element: <TeacherDoc />,
    roles: ["teacher", "headdepartment"],
  },
  {
    id: useId(),
    path: "crud-110",
    element: <Crud110 />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "crud-110/create",
    element: <Create110 />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "crud-110/edit/:id",
    element: <Edit110 />,

    roles: ["admin"],
  },
  {
    id: useId(),
    path: "confirm-teacher-110",
    element: <Mudir />,
    roles: ["headdepartment"],
  },
  {
    id: useId(),
    path: "confirm-teacher-110/:id",
    element: <ConfirmTeacher />,
    roles: ["headdepartment"],
  },
  {
    id: useId(),
    path: "study-department",
    element: <StudyDepartment />,
    roles: ["studydepartment", "admin"],
  },
  {
    id: useId(),
    path: "study-department/:id",
    element: <StudyDepartmentID />,
    roles: ["studydepartment", "admin"],
  },
  {
    id: useId(),
    path: "faculty-council",
    element: <FacultyCouncil />,
    roles: ["facultycouncil", "dean"],
  },
  {
    id: useId(),
    path: "faculty-council/:id",
    element: <FacultyCouncilID />,
    roles: ["facultycouncil", "dean"],
  },
  {
    id: useId(),
    path: "portfolio",
    element: <TeacherPortfolio />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "portfolio/create",
    element: <TeacherPortfolioCreate />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "portfolio/edit/:id",
    element: <TeacherPortfolioEdit />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "blog",
    element: <TeacherBlog />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "blog/create",
    element: <TeacherBlogCreate />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "blog/edit/:id",
    element: <TeacherBlogEdit />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "experience",
    element: <TeacherEx />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "experience/create",
    element: <TeacherExCreate />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "experience/edit/:id",
    element: <TeacherExEdit />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "scientific-activity",
    element: <TeacherSa />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "scientific-activity/create",
    element: <TeacherSaCreate />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "scientific-activity/edit/:id",
    element: <TeacherSaEdit />,
    roles: [
      "teacher",
      "dean",
      "rector",
      "via-rector",
      "deputydean",
      "headdepartment",
      "director",
      "Staff",
    ],
  },
  {
    id: useId(),
    path: "appeal-to-teacher",
    element: <AppealTeacher />,
    roles: ["teacher"],
  },
];
