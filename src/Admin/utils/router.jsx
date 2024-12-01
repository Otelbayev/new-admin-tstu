import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useId } from "../../hooks/useId";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Appeals = lazy(() => import("../pages/Appeals"));

const Menu = lazy(() => import("../pages/Menu/menu"));
const CreateMenu = lazy(() => import("../pages/Menu/add-menu"));
const EditMenu = lazy(() => import("../pages/Menu/update-menu"));

const Page = lazy(() => import("../pages/Page/pages"));
const CreatePage = lazy(() => import("../pages/Page/add-page"));
const EditPage = lazy(() => import("../pages/Page/update-page"));

const Person = lazy(() => import("../pages/Employee/empoyee"));
const CreateEmployee = lazy(() => import("../pages/Employee/add-employee"));
const EditEmployee = lazy(() => import("../pages/Employee/update-employee"));

const Blog = lazy(() => import("../pages/Blog/blog"));
const CreateBlog = lazy(() => import("../pages/Blog/add-blog"));
const EditBlog = lazy(() => import("../pages/Blog/update-blog"));

const Status = lazy(() => import("../pages/Crud/Status/status"));
const StatusCreate = lazy(() => import("../pages/Crud/Status/add-status"));
const StatusEdit = lazy(() => import("../pages/Crud/Status/update-status"));

const UserType = lazy(() => import("../pages/Crud/UserType/user-type"));
const UserTypeCreate = lazy(() =>
  import("../pages/Crud/UserType/add-user-type")
);
const UserTypeEdit = lazy(() =>
  import("../pages/Crud/UserType/update-user-type")
);

const MenuType = lazy(() => import("../pages/Crud/MenuType/menu-type"));
const MenuTypeCreate = lazy(() =>
  import("../pages/Crud/MenuType/add-menu-type")
);
const MenuTypeEdit = lazy(() =>
  import("../pages/Crud/MenuType/update-menu-type")
);

const Language = lazy(() => import("../pages/Crud/Language"));
const LanguageCreate = lazy(() =>
  import("../pages/Crud/Language/add-language")
);
const LanguageEdit = lazy(() =>
  import("../pages/Crud/Language/update-language")
);

const Country = lazy(() => import("../pages/Crud/Country/country"));
const CountryCreate = lazy(() => import("../pages/Crud/Country/add-country"));
const CountryEdit = lazy(() => import("../pages/Crud/Country/update-country"));

const Region = lazy(() => import("../pages/Crud/Region/regions"));
const RegionCreate = lazy(() => import("../pages/Crud/Region/add-region"));
const RegionEdit = lazy(() => import("../pages/Crud/Region/update-region"));

const Token = lazy(() => import("../pages/Crud/Token/token"));
const TokenCreate = lazy(() => import("../pages/Crud/Token/add-token"));
const TokenEdit = lazy(() => import("../pages/Crud/Token/update-token"));

const Gender = lazy(() => import("../pages/Crud/Gender/gender"));
const GenderCreate = lazy(() => import("../pages/Crud/Gender/add-gender"));
const GenderEdit = lazy(() => import("../pages/Crud/Gender/update-gender"));

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

const BlogCategory = lazy(() =>
  import("../pages/Crud/BlogCategory/blog-category")
);
const BlogCategoryCreate = lazy(() =>
  import("../pages/Crud/BlogCategory/add-blog-category")
);
const BlogCategoryEdit = lazy(() =>
  import("../pages/Crud/BlogCategory/update-blog-category")
);

const Users = lazy(() => import("../pages/User/users"));
const UserCreate = lazy(() => import("../pages/User/add-user"));
const UserEdit = lazy(() => import("../pages/User/update-user"));

const File = lazy(() => import("../pages/Crud/File"));
const FileCreate = lazy(() => import("../pages/Crud/File/add-file"));
const FileEdit = lazy(() => import("../pages/Crud/File/update-file"));

const Interactive = lazy(() => import("../pages/Crud/Interactive/interactive"));
const InteractiveCreate = lazy(() =>
  import("../pages/Crud/Interactive/add-interactive")
);
const InteractiveEdit = lazy(() =>
  import("../pages/Crud/Interactive/update-interactive")
);

const Statistics = lazy(() => import("../pages/Crud/Statistics"));
const StatisticsCreate = lazy(() =>
  import("../pages/Crud/Statistics/add-statistics")
);
const StatisticsEdit = lazy(() =>
  import("../pages/Crud/Statistics/update-statistics")
);

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

const ConfirmTeacher = lazy(() => import("../pages/Mudir/confirm"));

const StudyDepartment = lazy(() => import("../pages/Study"));
const StudyDepartmentID = lazy(() => import("../pages/Study/study-dep"));
const FacultyCouncil = lazy(() => import("../pages/FacultyCouncil"));
const FacultyCouncilID = lazy(() =>
  import("../pages/FacultyCouncil/concil-id")
);

const Rectorat = lazy(() => import("../pages/Rectorat"));
const RectoratEdit = lazy(() => import("../pages/Rectorat/edit"));

const Info = lazy(() => import("../pages/Info"));

const ProfileDep = lazy(() => import("../pages/ProfileDep"));

const Asset = lazy(() => import("../pages/Asset/asset"));

const AssetType = lazy(() => import("../pages/Asset/asset-type"));
const AssetTypeCreate = lazy(() => import("../pages/Asset/create-asset-type"));

const AssetTransaction = lazy(() => import("../pages/Asset/asset-transaction"));

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
    path: "/blog/:type",
    element: <Blog role={["admin", "moderatorcontent"]} />,
    roles: ["admin", "moderatorcontent"],
  },
  {
    id: useId(),
    path: "/blogs/create",
    element: <CreateBlog />,
    roles: ["admin", "moderatorcontent"],
  },
  {
    id: useId(),
    path: "/blogs/edit/:id",
    element: <EditBlog />,
    roles: ["admin", "moderatorcontent"],
  },
  {
    id: useId(),
    path: "/profile",
    element: <Profile />,
    roles: ["*"],
  },
  {
    id: useId(),
    path: "/my-data",
    element: <Info />,
    roles: ["*"],
  },
  {
    id: useId(),
    path: "/appeals",
    element: <Appeals />,
    roles: ["admin", "virtualreception"],
  },
  //DepartmentType
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
  //UserType
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
  //MenuType
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
  //BlogCategory
  {
    id: useId(),
    path: "/blogcategory",
    element: <BlogCategory />,
    roles: ["admin", "moderatorcontent"],
  },
  {
    id: useId(),
    path: "/blogcategory/create",
    element: <BlogCategoryCreate />,
    roles: ["admin", "moderatorcontent"],
  },
  {
    id: useId(),
    path: "/blogcategory/edit/:id",
    element: <BlogCategoryEdit />,
    roles: ["admin", "moderatorcontent"],
  },
  //Status
  {
    id: useId(),
    path: "/status",
    element: <Status />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/status/create",
    element: <StatusCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/status/edit/:id",
    element: <StatusEdit />,
    roles: ["admin"],
  },
  //Language
  {
    id: useId(),
    path: "/language",
    element: <Language />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/language/create",
    element: <LanguageCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/language/edit/:id",
    element: <LanguageEdit />,
    roles: ["admin"],
  },
  //Region
  {
    id: useId(),
    path: "/region",
    element: <Region />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/region/create",
    element: <RegionCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/region/edit/:id",
    element: <RegionEdit />,
    roles: ["admin"],
  },
  //Country
  {
    id: useId(),
    path: "/country",
    element: <Country />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/country/create",
    element: <CountryCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/country/edit/:id",
    element: <CountryEdit />,
    roles: ["admin"],
  },
  //Employment
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
  //Token
  {
    id: useId(),
    path: "/token",
    element: <Token />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/token/create",
    element: <TokenCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/token/edit/:id",
    element: <TokenEdit />,
    roles: ["admin"],
  },
  //Gender
  {
    id: useId(),
    path: "/gender",
    element: <Gender />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/gender/create",
    element: <GenderCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/gender/edit/:id",
    element: <GenderEdit />,
    roles: ["admin"],
  },
  //Users
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
  //EmployeeType
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
  //File
  {
    id: useId(),
    path: "/file",
    element: <File />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/file/create",
    element: <FileCreate />,

    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/file/edit/:id",
    element: <FileEdit />,

    roles: ["admin"],
  },
  //Interactive
  {
    id: useId(),
    path: "/interactive",
    element: <Interactive />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/interactive/create",
    element: <InteractiveCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/interactive/edit/:id",
    element: <InteractiveEdit />,

    roles: ["admin"],
  },
  //Statistics
  {
    id: useId(),
    path: "/statistics",
    element: <Statistics />,

    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/statistics/create",
    element: <StatisticsCreate />,

    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/statistics/edit/:id",
    element: <StatisticsEdit />,
    roles: ["admin"],
  },
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
  {
    id: useId(),
    path: "department",
    element: <ProfileDep />,
    roles: ["dean", "deputydean", "headdepartment", "director"],
  },
  {
    id: useId(),
    path: "/asset",
    element: <Asset />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/asset-type",
    element: <AssetType />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/asset-type/create",
    element: <AssetTypeCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/asset-transaction",
    element: <AssetTransaction />,
    roles: ["admin"],
  },
];
