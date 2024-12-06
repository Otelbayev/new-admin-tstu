import { useId } from "../../hooks/useId";
import { lazy } from "react";
const Blog = lazy(() => import("../pages/Blog/blog"));
const CreateBlog = lazy(() => import("../pages/Blog/add-blog"));
const EditBlog = lazy(() => import("../pages/Blog/update-blog"));

const BlogCategory = lazy(() =>
  import("../pages/Crud/BlogCategory/blog-category")
);
const BlogCategoryCreate = lazy(() =>
  import("../pages/Crud/BlogCategory/add-blog-category")
);
const BlogCategoryEdit = lazy(() =>
  import("../pages/Crud/BlogCategory/update-blog-category")
);

export const blog = [
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
];
