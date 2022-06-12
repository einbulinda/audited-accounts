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
import UserAuthPage from "../pages/userAuth/UserAuthPage";

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
      <Routes>
        <Route element={<RestrictedRoutes />}>
          <Route path={url.REGISTER} element={<UserAuthPage />} />
          <Route path={url.LOGIN} element={<UserAuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;
