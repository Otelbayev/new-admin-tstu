import React, { lazy } from "react";
import { useId } from "../hooks/useId";

const Blog = lazy(() => import("../pages/Blog"));
const BlogId = lazy(() => import("../pages/BlogID"));
const Announcements = lazy(() => import("../pages/Announcements"));
const Education = lazy(() => import("../pages/Education"));
const Search = lazy(() => import("../pages/Search"));

const Department = lazy(() => import("../pages/Department"));
const DepartmentID = lazy(() => import("../pages/DepartmentID"));

const PageID = lazy(() => import("../pages/PageID"));

const EmployeeID = lazy(() => import("../pages/EmployeeID"));

const Faculties = lazy(() => import("../pages/Faculties"));
const FacultiesID = lazy(() => import("../pages/FacultiesID"));

const Kafedra = lazy(() => import("../pages/Kafedra"));
const KafedraID = lazy(() => import("../pages/KafedraID"));

const Honory = lazy(() => import("../pages/Honory"));

const Contact = lazy(() => import("../pages/Contact"));
const Faq = lazy(() => import("../pages/Faq"));
const Appeals = lazy(() => import("../pages/Rector"));
const History = lazy(() => import("../pages/History"));
const Rectorat = lazy(() => import("../pages/Rectorat"));

const InteractiveServices = lazy(() => import("../pages/Interactive"));
const Centers = lazy(() => import("../pages/Centers"));
const ScientificCenter = lazy(() => import("../pages/ScientificCenter"));
const SignIn = lazy(() => import("../pages/SignIn"));
const HomePage = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/404"));
const Galereya = lazy(() => import("../pages/Galereya"));
const Arm = lazy(() => import("../pages/Arm"));
const StudentLife = lazy(() => import("../pages/StudentLife"));
const Structure = lazy(() => import("../pages/Structure"));
const OAV = lazy(() => import("../pages/Oav"));
const Events = lazy(() => import("../pages/Events"));

const Brm = lazy(() => import("../pages/Brm"));
const Aboutus = lazy(() => import("../pages/Aboutus"));
const Bdirections = lazy(() => import("../pages/Bdirections"));
const Mdirections = lazy(() => import("../pages/Mdirections"));
const Collage = lazy(() => import("../pages/College"));

const Schulde = lazy(() => import("../pages/Schulde"));
const Rating = lazy(() => import("../pages/Rating"));
const RatingKaf = lazy(() => import("../pages/Rating/kafedras"));
const RatingTeachers = lazy(() => import("../pages/Rating/teachers"));
const Chart = lazy(() => import("../pages/Rating/chart"));

export const navbar = [
  {
    id: useId(),
    path: "rating",
    element: <Rating />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "chart",
    element: <Chart />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "rating/:fak",
    element: <RatingKaf />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "rating/:fak/:kaf",
    element: <RatingTeachers />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "brm",
    element: <Brm />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "aboutus",
    element: <Aboutus />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "bdirections",
    element: <Bdirections />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "mdirections",
    element: <Mdirections />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "college",
    element: <Collage />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "history",
    element: <History />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "structure",
    element: <Structure />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "scientific-center",
    element: <ScientificCenter />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "centers",
    element: <Centers />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "honory",
    element: <Honory />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "rectorat",
    element: <Rectorat />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "department",
    element: <Department />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "interactive-services",
    element: <InteractiveServices />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "student-life",
    element: <StudentLife />,
  },
  {
    id: useId(),
    path: "oav",
    element: <OAV />,
  },
  {
    id: useId(),
    path: "events",
    element: <Events />,
  },
  {
    id: useId(),
    path: "department/:id",
    element: <DepartmentID />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "page/:id",
    element: <PageID />,
  },
  {
    id: useId(),
    path: "lessonschedule",
    element: <Schulde />,
  },
];

export const routes = [
  {
    id: useId(),
    path: "/",
    element: <HomePage />,
    isPrivate: false,
  },
  { id: useId(), path: "*", element: <NotFound />, isPrivate: false },
  { id: useId(), path: "arm", element: <Arm />, isPrivate: false },
  { id: useId(), path: "galereya", element: <Galereya />, isPrivate: false },
  {
    id: useId(),
    path: "faculty/:id",
    element: <FacultiesID />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "kafedra/:id",
    element: <KafedraID />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "employee/:id",
    element: <EmployeeID />,
    isPrivate: false,
  },
];

export const noshowcase = [
  {
    id: useId(),
    path: "faq",
    element: <Faq />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "contact",
    element: <Contact />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "appeals",
    element: <Appeals />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "blog",
    element: <Blog />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "blog/:id",
    element: <BlogId />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "announcements",
    element: <Announcements />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "education",
    element: <Education />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "faculty",
    element: <Faculties />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "signin",
    element: <SignIn />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "kafedra",
    element: <Kafedra />,
    isPrivate: false,
  },
  {
    id: useId(),
    path: "search",
    element: <Search />,
    isPrivate: false,
  },
];
