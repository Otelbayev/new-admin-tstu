import { useEffect } from "react";
import { useDepartmentContext } from "../context/DepartmentContext";
import {
  FcApprove,
  FcBusinessman,
  FcDatabase,
  FcDepartment,
  FcExport,
  FcGallery,
  FcLibrary,
  FcList,
  FcMenu,
  FcNews,
  FcOk,
  FcPackage,
  FcPositiveDynamic,
  FcRatings,
  FcReadingEbook,
  FcRules,
  FcSettings,
  FcTemplate,
  FcVoicePresentation,
  FcViewDetails,
} from "react-icons/fc";
import { Tooltip } from "antd";

// LearningForms ->  Ta'lim shakli (sirtqi, kunduzgi, ...)  faqat admin panel
// EducationLanguages -> o'quv tili (rus, uzbek, ...)   faqat admin panel
// StudentGroups ->  guruhlar )  admin panel, dekan, dekan o'rinbosari va facultycouncl uchun
// AcademiSubject -> fanlar)  admin panel, dekan, dekan o'rinbosari va facultycouncl uchun
// LessonTime -> dars vaqtlari (1 para 8.00 dan 9.20 gacha) faqat admin panel
// EducationalBuilding -> universitet binolari  )  faqat admin panel
// RoomTypes -> xona turi)  faqat admin panel
// Rooms -> xona)  faqat admin panel
// RangeRooms -> department uchun xona diapazoni)   admin panel va kafedra mudiri uchun

// 'selected' so'zi bilan tugaydiganlar statik token orqali ishlaydi
// 'faculty' sozi bilan tugaganlar dekan, dekan o'rinbosari va facultycouncl uchun ishlaydi
// 'department' sozi bilan tugaydiganlar kafedra mudiri uchun ishlaydi

export const admin = () => {
  const {
    sidebarDepartment,
    getSidebarDepartment,
    isCreateDepartmentType,
    isDeleteDepartmentType,
  } = useDepartmentContext();

  useEffect(() => {
    getSidebarDepartment();
  }, [isCreateDepartmentType, isDeleteDepartmentType]);

  return [
    {
      id: 1,
      key: "pages",
      label: "Sahifalar",
      roles: ["admin"],
      icon: <FcPackage size={"25px"} />,
    },
    {
      id: 2,
      label: "Menu",
      icon: <FcMenu size={"25px"} />,
      roles: ["admin"],
      children: [
        { label: "Menu", key: "menu" },
        { label: "Menu Type", key: "menutype" },
      ],
    },
    {
      id: 3,
      label: "Blog",
      roles: ["admin"],
      icon: <FcRules size={"25px"} />,
      children: [
        { label: "News", key: "blog/news" },
        { label: "Blog", key: "blog/blog" },
        { label: "Events", key: "blog/events" },
        { label: "Blog Category", key: "blogcategory" },
      ],
    },
    {
      id: 4,
      label: "Yangiliklar",
      roles: ["moderatorcontent"],
      icon: <FcNews size={"25px"} />,
      key: "blog/news",
    },
    {
      id: 5,
      label: "Blog",
      roles: ["moderatorcontent"],
      icon: <FcRules size={"25px"} />,
      key: "blog/blog",
    },
    {
      id: 6,
      label: "Tadbirlar",
      roles: ["moderatorcontent"],
      icon: <FcTemplate size={"25px"} />,
      key: "blog/events",
    },
    {
      id: 7,
      label: "Employee",
      roles: ["admin"],
      children: [
        { label: "Employee", key: "employee" },
        { label: "Employmee Type", key: "employeetype" },
        { label: "Employment", key: "employment" },
      ],
      icon: <FcBusinessman size={"25px"} />,
    },
    {
      id: 8,
      label: "Depaerment",
      roles: ["admin"],
      icon: <FcDepartment size={"25px"} />,
      children: [
        { label: "Department Type", key: "departmenttype" },
        ...sidebarDepartment,
      ],
    },
    {
      id: 9,
      label: "User",
      roles: ["admin"],
      children: [
        { label: "Users", key: "users" },
        { label: "User Type", key: "usertype" },
      ],
      icon: <FcReadingEbook size={"25px"} />,
    },
    {
      id: 1100,
      label: "Teacher Daily CRUD",
      roles: ["admin"],
      icon: <FcViewDetails size={"25px"} />,
      children: [
        { label: "Gruhlar", key: "student-group" },
        { label: "Fanlar", key: "academi-subject" },
        { label: "Xona diapazoni", key: "range-rooms" },
        { label: "Xonalar", key: "rooms" },
        { label: "Dars soati", key: "lesson-time" },
        { label: "Xona turlari", key: "room-types" },
        { label: "O'quv binolari", key: "edu-build" },
        { label: "Ta'lim tili", key: "edu-lang" },
        { label: "Ta'lim shakli", key: "learning-form" },
      ],
    },
    {
      id: 1100,
      label: "O'qituvchi kundaligi",
      roles: ["dean", "deputydean", "facultycouncil"],
      icon: <FcViewDetails size={"25px"} />,
      children: [
        { label: "Gruhlar", key: "student-group" },
        { label: "Fanlar", key: "academi-subject" },
      ],
    },
    {
      id: 10,
      label: "CRUD",
      roles: ["admin"],
      children: [
        { label: "Doc CRUD 110", key: "crud-110" },
        { label: "Teachers 110", key: "study-department" },
        { label: "Appeals", key: "appeals" },
        { label: "Interactive", key: "interactive" },
        { label: "Statistika", key: "statistics" },
        { label: "File", key: "file" },
        { label: "Language", key: "language" },
        { label: "Token", key: "token" },
        { label: "Status", key: "status" },
        { label: "Gender", key: "gender" },
        { label: "Mamlakat", key: "country" },
        { label: "Viloyat", key: "region" },
      ],
      icon: <FcList size={"25px"} />,
    },
    {
      id: 11,
      key: "import-doc",
      label: "110 ball",
      roles: ["teacher", "headdepartment"],
      icon: <FcExport size={"25px"} />,
    },
    {
      id: 12,
      key: "confirm-teacher-110",
      label: "O'qituvchi 110 tasdiqlash",
      roles: ["headdepartment"],
      icon: <FcApprove size={"25px"} />,
    },
    {
      id: 13,
      key: "study-department",
      label: "O'qituvchilarni baholash",
      roles: ["studydepartment"],
      icon: <FcRatings size={"25px"} />,
    },
    {
      id: 14,
      key: "appeals",
      label: "Murojaatlar",
      roles: ["virtualreception"],
      icon: <FcVoicePresentation size={"25px"} />,
    },
    {
      id: 15,
      key: "faculty-council",
      label: "O'qituvchilarni baholash",
      roles: ["facultycouncil", "dean"],
      icon: <FcRatings size={"25px"} />,
    },
    {
      id: 16,
      key: "department",
      label: "Bo'lim ma'lumotlari",
      roles: ["dean", "deputydean", "headdepartment", "director"],
      icon: <FcDepartment size={"25px"} />,
    },
    {
      id: 17,
      label: (
        <Tooltip title="O'qituvchilarni faoliyatini tasdiqlash">
          O'qituvchilarni faoliyatini tasdiqlash
        </Tooltip>
      ),
      roles: ["headdepartment"],
      icon: <FcOk size={"25px"} />,
      children: [
        { label: "Portfolio", key: "confirm-portfolio" },
        { label: "Blog", key: "confirm-blog" },
        { label: "Tadjriba", key: "confirm-exprience" },
        { label: "Ilmiy Faoliyari", key: "confirm-science" },
      ],
    },
    {
      id: 18,
      key: "experience",
      label: "Tadjribasi",
      roles: [
        "teacher",
        "dean",
        "rector",
        "vice-rector",
        "deputydean",
        "headdepartment",
        "director",
        "Staff",
      ],
      icon: <FcPositiveDynamic size={"25px"} />,
    },
    {
      id: 19,
      key: "portfolio",
      label: "Portfolio",
      roles: [
        "teacher",
        "dean",
        "rector",
        "vice-rector",
        "deputydean",
        "headdepartment",
        "director",
        "Staff",
      ],
      icon: <FcGallery size={"25px"} />,
    },
    {
      id: 20,
      key: "blog",
      label: "Blog",
      roles: [
        "teacher",
        "dean",
        "rector",
        "vice-rector",
        "deputydean",
        "headdepartment",
        "director",
        "Staff",
      ],
      icon: <FcRules size={"25px"} />,
    },
    {
      id: 21,
      key: "scientific-activity",
      label: "Ilmiy faoliyati",
      roles: [
        "teacher",
        "dean",
        "rector",
        "vice-rector",
        "deputydean",
        "headdepartment",
        "director",
        "Staff",
      ],
      icon: <FcRatings size={"25px"} />,
    },
    {
      id: 22,
      label: "Boshqaruv",
      roles: ["moderatorcontent"],
      icon: <FcSettings size={"25px"} />,
      children: [{ label: "Rektorat", key: "rectorat" }],
    },
    {
      id: 23,
      label: "Ma'lumotlarim",
      key: "my-data",
      roles: ["headdepartment", "teacher"],
      icon: <FcDatabase size={"25px"} />,
    },
    {
      id: 21,
      label: "Aktivlar",
      roles: ["admin"],
      icon: <FcLibrary size={"25px"} />,
      children: [
        { label: "Asset", key: "asset" },
        { label: "Asset Type", key: "asset-type" },
        { label: "Asset Transaction", key: "asset-transaction" },
      ],
    },
  ];
};
