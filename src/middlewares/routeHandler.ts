import http from "node:http";
import { getRoutes } from "../routes/routes";
import { Database } from "../database/database";

const database = new Database();

export function routeHandler(
  request: http.IncomingMessage,
  response: http.ServerResponse,
) {
  const route = getRoutes().find((route) => {
    return route.method === request.method && route.path === request.url;
  });

  if (route) {
    return route.controller({ request, response, database });
  } else {
    return response
      .writeHead(404)
      .end(JSON.stringify({ message: "Route not found" }));
  }
}
