import { ticketsRoute } from "./tickets";
import { parseRoutePath } from "./util/parseRoutePath";

export const routes = [...ticketsRoute()].map((route) => ({
  ...route,
  path:
    typeof route.path === "string" ? parseRoutePath(route.path) : route.path,
}));
