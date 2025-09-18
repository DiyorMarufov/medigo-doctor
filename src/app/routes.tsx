import { lazy } from "react";
import { useRoutes } from "react-router-dom";
const MainLayout = lazy(() => import("../layout/MainLayout"));
const Home = lazy(() => import("../features/home/pages/Home"));
const Auth = lazy(() => import("../features/auth/pages/Auth"));
const SignIn = lazy(() => import("../features/auth/pages/SignIn"));
const Otp = lazy(() => import("../features/auth/pages/Otp"));
const Pending = lazy(() => import("../features/auth/pages/Pending"));
const UploadFile = lazy(() => import("../features/upload-file/pages/UploadFile"));

export const AppRouter = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Auth />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            { index: true, element: <Home /> },
          ],
        },
      ],
    },
    {path: "/sign-in", element: <SignIn/>},
    {path: "/otp", element: <Otp/>},
    {path:"/upload-file", element: <UploadFile />},
    {path:"/pending", element: <Pending />},
  ]);

  return routes;
};
