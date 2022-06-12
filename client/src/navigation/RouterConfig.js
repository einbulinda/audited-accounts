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
import Loading from "./Loading";

const AppLayout = lazy(() => import("./Layout/AppLayout"));
const UserAuthPage = lazy(() => import("../pages/userAuth/UserAuthPage"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to={url.LOGIN} />}</>;
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
          <Route path={url.HOME} element={<Navigate to={url.LOGIN} />} />
          <Route element={<PrivateRoutes />}>
            <Route
              path={url.DASHBOARD}
              element={
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              }
            />
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
