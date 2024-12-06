import { lazy } from "react";
import { useId } from "../../hooks/useId";

const Asset = lazy(() => import("../pages/Asset/asset"));

const AssetType = lazy(() => import("../pages/Asset/asset-type"));
const AssetTypeCreate = lazy(() => import("../pages/Asset/create-asset-type"));

const AssetTransaction = lazy(() => import("../pages/Asset/asset-transaction"));

export const asset = [
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
