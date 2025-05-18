import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { routes } from "./routes";

const componentMap = {
  Products: lazy(() => import("../components/Products/index.jsx")),
  Login: lazy(() => import("../components/Login/index.jsx")),
  Cart: lazy(() => import("../components/Cart/index.jsx")),
};

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, component }) => {
        const Component = componentMap[component];
        return (
          <Route
            key={path}
            path={`/${path.toLowerCase()}`}
            element={
              <Suspense fallback={<div>loading ....</div>}>
                <Component />
              </Suspense>
            }
          />
        );
      })}

      <Route path="*" element={<Navigate replace to={`/products`} />} />
    </Routes>
  );
};

export default AppRoutes;
