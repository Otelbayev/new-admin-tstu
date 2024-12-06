import { useId } from "../../hooks/useId";
import { lazy } from "react";

const EduLang = lazy(() =>
  import("../pages/TeacherDaily/EducationLanguage/edu-lang")
);
const AddEduLang = lazy(() =>
  import("../pages/TeacherDaily/EducationLanguage/add-edu-lang")
);
const UpdateEduLang = lazy(() =>
  import("../pages/TeacherDaily/EducationLanguage/update-edu-lang")
);

const LearningForm = lazy(() =>
  import("../pages/TeacherDaily/LearningForm/learning-form")
);
const AddLearningForm = lazy(() =>
  import("../pages/TeacherDaily/LearningForm/add-learning-form")
);
const UpdateLearningForm = lazy(() =>
  import("../pages/TeacherDaily/LearningForm/update-learning-form")
);

const StudentGroup = lazy(() =>
  import("../pages/TeacherDaily/StudentGroup/student-group")
);
const AddStudentGroup = lazy(() =>
  import("../pages/TeacherDaily/StudentGroup/add-student-group")
);
const UpdateStudentGroup = lazy(() =>
  import("../pages/TeacherDaily/StudentGroup/update-student-group")
);

const AcademiSubject = lazy(() =>
  import("../pages/TeacherDaily/AcademiSubject")
);

const AddAcademiSubject = lazy(() =>
  import("../pages/TeacherDaily/AcademiSubject/add")
);

const UpdateAcademiSubject = lazy(() =>
  import("../pages/TeacherDaily/AcademiSubject/update")
);

const LessonTime = lazy(() => import("../pages/TeacherDaily/LessonTime"));
const AddLessonTime = lazy(() =>
  import("../pages/TeacherDaily/LessonTime/add")
);
const UpdateLessonTime = lazy(() =>
  import("../pages/TeacherDaily/LessonTime/update")
);

const EduBuild = lazy(() =>
  import("../pages/TeacherDaily/EducationalBuilding")
);
const AddEduBuild = lazy(() =>
  import("../pages/TeacherDaily/EducationalBuilding/add")
);
const UpdateEduBuild = lazy(() =>
  import("../pages/TeacherDaily/EducationalBuilding/update")
);

const RoomTypes = lazy(() => import("../pages/TeacherDaily/RoomTypes"));
const AddRoomTypes = lazy(() => import("../pages/TeacherDaily/RoomTypes/add"));
const UpdateRoomTypes = lazy(() =>
  import("../pages/TeacherDaily/RoomTypes/update")
);

const Rooms = lazy(() => import("../pages/TeacherDaily/Rooms"));
const AddRooms = lazy(() => import("../pages/TeacherDaily/Rooms/add"));
const UpdateRooms = lazy(() => import("../pages/TeacherDaily/Rooms/update"));

const RangeRooms = lazy(() => import("../pages/TeacherDaily/RangeRooms"));
const AddRangeRooms = lazy(() =>
  import("../pages/TeacherDaily/RangeRooms/add")
);
const UpdateRangeRooms = lazy(() =>
  import("../pages/TeacherDaily/RangeRooms/update")
);

export const daily = [
  {
    id: useId(),
    path: "/edu-lang",
    element: <EduLang />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/edu-lang/create",
    element: <AddEduLang />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/edu-lang/edit/:id",
    element: <UpdateEduLang />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/learning-form",
    element: <LearningForm />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/learning-form/create",
    element: <AddLearningForm />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/learning-form/edit/:id",
    element: <UpdateLearningForm />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/student-group",
    element: <StudentGroup />,
    roles: ["admin", "dean", "deputydean", "facultycouncil"],
  },
  {
    id: useId(),
    path: "/student-group/create",
    element: <AddStudentGroup />,
    roles: ["admin", "dean", "deputydean", "facultycouncil"],
  },
  {
    id: useId(),
    path: "/student-group/edit/:id",
    element: <UpdateStudentGroup />,
    roles: ["admin", "dean", "deputydean", "facultycouncil"],
  },
  {
    id: useId(),
    path: "/academi-subject",
    element: <AcademiSubject />,
    roles: ["admin", "dean", "deputydean", "facultycouncil"],
  },
  {
    id: useId(),
    path: "/academi-subject/create",
    element: <AddAcademiSubject />,
    roles: ["admin", "dean", "deputydean", "facultycouncil"],
  },
  {
    id: useId(),
    path: "/academi-subject/edit/:id",
    element: <UpdateAcademiSubject />,
    roles: ["admin", "dean", "deputydean", "facultycouncil"],
  },
  {
    id: useId(),
    path: "/lesson-time",
    element: <LessonTime />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/lesson-time/create",
    element: <AddLessonTime />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/lesson-time/edit/:id",
    element: <UpdateLessonTime />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/edu-build",
    element: <EduBuild />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/edu-build/create",
    element: <AddEduBuild />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/edu-build/edit/:id",
    element: <UpdateEduBuild />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/room-types",
    element: <RoomTypes />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/room-types/create",
    element: <AddRoomTypes />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/room-types/edit/:id",
    element: <UpdateRoomTypes />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/rooms",
    element: <Rooms />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/rooms/create",
    element: <AddRooms />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/rooms/edit/:id",
    element: <UpdateRooms />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/range-rooms",
    element: <RangeRooms />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/range-rooms/create",
    element: <AddRangeRooms />,
    roles: ["admin"],
  },
  {
    id: useId(),
    path: "/range-rooms/edit/:id",
    element: <UpdateRangeRooms />,
    roles: ["admin"],
  },
];
