import { useId } from "../../hooks/useId";
import { lazy } from "react";

const Status = lazy(() => import("../pages/Crud/Status/status"));
const StatusCreate = lazy(() => import("../pages/Crud/Status/add-status"));
const StatusEdit = lazy(() => import("../pages/Crud/Status/update-status"));

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

export const crud = [
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
];
