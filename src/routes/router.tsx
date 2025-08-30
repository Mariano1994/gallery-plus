import { createBrowserRouter } from "react-router";
import PageComponets from "../pages/page-components";
import LayoutMain from "../pages/layout-main";
import PageHome from "../pages/page-home";
import PagePhotoDetails from "../pages/page-photo-details";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    children: [
      {
        path: "/",
        element: <PageHome />,
      },
      {
        path: "/photos/:id",
        element: <PagePhotoDetails />,
      },
      {
        path: "/components",
        element: <PageComponets />,
      },
    ],
  },
]);
