import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    name: " ",
    path: "/",
    component: lazy(() => import("@/pages/home")),
  },
  {
    name: "home",
    path: "/home",
    component: lazy(() => import("@/pages/home")),
  },
];

const generateRouter = (routes) => {
  return routes.map((route) => {
    if (route.children) {
      route.children = generateRouter(route.children);
    }
    route.element = (
      <Suspense fallback={<div>Loading</div>}>
        <route.component key={route.path} />
      </Suspense>
    );
    return route;
  });
};

const generateRouters = generateRouter(routes);

const router = createBrowserRouter(generateRouters);

export { router };
