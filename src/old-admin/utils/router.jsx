import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useId } from "../../hooks/useId";

// Lazy load all components
const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Appeals = lazy(() => import("../pages/Appeals"));

const Menu = lazy(() => import("../pages/Menu/Main"));
const CreateMenu = lazy(() => import("../pages/Menu/Create"));
const EditMenu = lazy(() => import("../pages/Menu/Edit"));

const Page = lazy(() => import("../pages/Page/Main"));
const CreatePage = lazy(() => import("../pages/Page/Create"));
const EditPage = lazy(() => import("../pages/Page/Edit"));

const Person = lazy(() => import("../pages/Employee/Main"));
const CreateEmployee = lazy(() => import("../pages/Employee/Create"));
const EditEmployee = lazy(() => import("../pages/Employee/Edit"));

const Blog = lazy(() => import("../pages/Blog/Main"));
const CreateBlog = lazy(() => import("../pages/Blog/Create"));
const EditBlog = lazy(() => import("../pages/Blog/Edit"));

const Status = lazy(() => import("../pages/Crud/Status/Main"));
const StatusCreate = lazy(() => import("../pages/Crud/Status/Create"));
const StatusEdit = lazy(() => import("../pages/Crud/Status/Edit"));

const Site = lazy(() => import("../pages/Site/Main"));
const SiteCreate = lazy(() => import("../pages/Site/Create"));
const SiteEdit = lazy(() => import("../pages/Site/Edit"));

const SiteType = lazy(() => import("../pages/Crud/SIteType/Main"));
const SiteTypeCreate = lazy(() => import("../pages/Crud/SIteType/Create"));
const SiteTypeEdit = lazy(() => import("../pages/Crud/SIteType/Edit"));

const SiteDetails = lazy(() => import("../pages/Crud/SiteDetails/Main"));
const SiteDetailsCreate = lazy(() =>
  import("../pages/Crud/SiteDetails/Create")
);
const SiteDetailsEdit = lazy(() => import("../pages/Crud/SiteDetails/Edit"));

const UserType = lazy(() => import("../pages/Crud/UserType/Main"));
const UserTypeCreate = lazy(() => import("../pages/Crud/UserType/Create"));
const UserTypeEdit = lazy(() => import("../pages/Crud/UserType/Edit"));

const MenuType = lazy(() => import("../pages/Crud/MenuType/Main"));
const MenuTypeCreate = lazy(() => import("../pages/Crud/MenuType/Create"));
const MenuTypeEdit = lazy(() => import("../pages/Crud/MenuType/Edit"));

const Language = lazy(() => import("../pages/Crud/Language/Main"));
const LanguageCreate = lazy(() => import("../pages/Crud/Language/Create"));
const LanguageEdit = lazy(() => import("../pages/Crud/Language/Edit"));

const City = lazy(() => import("../pages/Crud/City/Main"));
const CityCreate = lazy(() => import("../pages/Crud/City/Create"));
const CityEdit = lazy(() => import("../pages/Crud/City/Edit"));

const Country = lazy(() => import("../pages/Crud/Country/Main"));
const CountryCreate = lazy(() => import("../pages/Crud/Country/Create"));
const CountryEdit = lazy(() => import("../pages/Crud/Country/Edit"));

const Region = lazy(() => import("../pages/Crud/Region/Main"));
const RegionCreate = lazy(() => import("../pages/Crud/Region/Create"));
const RegionEdit = lazy(() => import("../pages/Crud/Region/Edit"));

const Token = lazy(() => import("../pages/Crud/Token/Main"));
const TokenCreate = lazy(() => import("../pages/Crud/Token/Create"));
const TokenEdit = lazy(() => import("../pages/Crud/Token/Edit"));

const Gender = lazy(() => import("../pages/Crud/Gender/Main"));
const GenderCreate = lazy(() => import("../pages/Crud/Gender/Create"));
const GenderEdit = lazy(() => import("../pages/Crud/Gender/Edit"));

const Employment = lazy(() => import("../pages/Crud/Employment/Main"));
const EmploymentCreate = lazy(() => import("../pages/Crud/Employment/Create"));
const EmploymentEdit = lazy(() => import("../pages/Crud/Employment/Edit"));

const EmployeeType = lazy(() => import("../pages/Crud/EmployeeType/Main"));
const EmployeeTypeCreate = lazy(() =>
  import("../pages/Crud/EmployeeType/Create")
);
const EmployeeTypeEdit = lazy(() => import("../pages/Crud/EmployeeType/Edit"));

const Neighborhood = lazy(() => import("../pages/Crud/Neighborhood/Main"));
const NeighborhoodCreate = lazy(() =>
  import("../pages/Crud/Neighborhood/Create")
);
const NeighborhoodEdit = lazy(() => import("../pages/Crud/Neighborhood/Edit"));

const Department = lazy(() => import("../pages/Department/Main"));
const DepartmentCreate = lazy(() => import("../pages/Department/Create"));
const DepartmentEdit = lazy(() => import("../pages/Department/Edit"));

const DepartmentType = lazy(() => import("../pages/Crud/DepartmentType/Main"));
const DepartmentTypeCreate = lazy(() =>
  import("../pages/Crud/DepartmentType/Create")
);
const DepartmentTypeEdit = lazy(() =>
  import("../pages/Crud/DepartmentType/Edit")
);

const DepartmentDetails = lazy(() =>
  import("../pages/Crud/DepartmentDetails/Main")
);
const DepartmentDetailsCreate = lazy(() =>
  import("../pages/Crud/DepartmentDetails/Create")
);
const DepartmentDetailsEdit = lazy(() =>
  import("../pages/Crud/DepartmentDetails/Edit")
);

const BlogCategory = lazy(() => import("../pages/Crud/BlogCategory/Main"));
const BlogCategoryCreate = lazy(() =>
  import("../pages/Crud/BlogCategory/Create")
);
const BlogCategoryEdit = lazy(() => import("../pages/Crud/BlogCategory/Edit"));

const Users = lazy(() => import("../pages/User/Main"));
const UserCreate = lazy(() => import("../pages/User/Create"));
const UserEdit = lazy(() => import("../pages/User/Edit"));

const File = lazy(() => import("../pages/Crud/File/Main"));
const FileCreate = lazy(() => import("../pages/Crud/File/Create"));
const FileEdit = lazy(() => import("../pages/Crud/File/Edit"));

const Interactive = lazy(() => import("../pages/Interactive/Main"));
const InteractiveCreate = lazy(() => import("../pages/Interactive/Create"));
const InteractiveEdit = lazy(() => import("../pages/Interactive/Edit"));

const Statistics = lazy(() => import("../pages/Crud/Statistics/Main"));
const StatisticsCreate = lazy(() => import("../pages/Crud/Statistics/Create"));
const StatisticsEdit = lazy(() => import("../pages/Crud/Statistics/Edit"));

const TeacherDoc = lazy(() => import("../pages/Teacher/FileImport"));

const Crud110 = lazy(() => import("../pages/Crud/Crud110"));
const Create110 = lazy(() => import("../pages/Crud/Crud110/Create110"));
const Edit110 = lazy(() => import("../pages/Crud/Crud110/Edit110"));

const Teacher110 = lazy(() => import("../pages/Crud/Crud110/all-teacher"));
const Teacher110ID = lazy(() => import("../pages/Crud/Crud110/all-teacher-id"));

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
  //Site
  {
    id: useId(),
    path: "/site",
    element: <Site />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/site/create",
    element: <SiteCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/site/edit/:id",
    element: <SiteEdit />,
    roles: ["admin"],
  },
  //SiteType
  {
    id: useId(),
    path: "/sitetype",
    element: <SiteType />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/sitetype/create",
    element: <SiteTypeCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/sitetype/edit/:id",
    element: <SiteTypeEdit />,
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
  //City
  {
    id: useId(),
    path: "/city",
    element: <City />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/city/create",
    element: <CityCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/city/edit/:id",
    element: <CityEdit />,
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
  //Neighborhood
  {
    id: useId(),
    path: "/neighborhood",
    element: <Neighborhood />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/neighborhood/create",
    element: <NeighborhoodCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/neighborhood/edit/:id",
    element: <NeighborhoodEdit />,
    roles: ["admin"],
  },
  //DepartmentDetails
  {
    id: useId(),
    path: "/department-details",
    element: <DepartmentDetails />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/department-details/create",
    element: <DepartmentDetailsCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/department-details/edit/:id",
    element: <DepartmentDetailsEdit />,
    roles: ["admin"],
  },
  //Site Details
  {
    id: useId(),
    path: "/site-details",
    element: <SiteDetails />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/site-details/create",
    element: <SiteDetailsCreate />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/site-details/edit/:id",
    element: <SiteDetailsEdit />,
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
    path: "teacher-110",
    element: <Teacher110 />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "teacher-110/:id",
    element: <Teacher110ID />,
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
    roles: ["studydepartment"],
  },
  {
    id: useId(),
    path: "study-department/:id",
    element: <StudyDepartmentID />,
    roles: ["studydepartment"],
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
      "user",
      "tyutor"
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
      "user",
      "tyutor"
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
      "user",
      "tyutor"
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
      "user",
      "tyutor"
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
      "user",
      "tyutor"
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
      "user",
      "tyutor"
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
      "user",
      "tyutor"
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
      "user",
      "tyutor"
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
      "user",
      "tyutor"
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
      "user",
      "tyutor"
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
      "user",
      "tyutor"
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
      "user",
      "tyutor"
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
];
