import { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { url } from "./CONSTANTS";

const UserAuthPage = lazy(() => import("../pages/userAuth/UserAuthPage"));
const HomePage = lazy(() => import("../pages/homepage/HomePage"));
const Loading = lazy(() => import("./Loading"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to={url.LOGIN} />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to={url.DASHBOARD} />}</>;
};

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path={url.HOME} element={<HomePage />} />
          <Route element={<PrivateRoutes />}>
            <Route path={url.DASHBOARD} element={<DashboardPage />} />
          </Route>

          <Route element={<RestrictedRoutes />}>
            <Route path={url.REGISTER} element={<UserAuthPage />} />
            <Route path={url.LOGIN} element={<UserAuthPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RouterConfig;
