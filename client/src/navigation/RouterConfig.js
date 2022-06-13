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

const NotFound = lazy(() => import("navigation/NotFound/NotFound"));
const AppLayout = lazy(() => import("navigation/Layout/AppLayout"));
const UserAuthPage = lazy(() => import("pages/userAuth/UserAuthPage"));
const DashboardPage = lazy(() => import("pages/dashboard/DashboardPage"));
const AddProfile = lazy(() => import("pages/profile/AddProfile"));

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
          <Route exact path={url.HOME} element={<Navigate to={url.LOGIN} />} />
          <Route exact element={<PrivateRoutes />}>
            <Route
              exact
              path={url.DASHBOARD}
              element={
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              }
            />
            <Route exact path={url.ADD_PROFILE} element={<AddProfile />} />
          </Route>

          <Route exact element={<RestrictedRoutes />}>
            <Route exact path={url.REGISTER} element={<UserAuthPage />} />
            <Route exact path={url.LOGIN} element={<UserAuthPage />} />
          </Route>
          {/* Catch All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RouterConfig;
