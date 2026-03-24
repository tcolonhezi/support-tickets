import http from "node:http";
import { Database } from "../database/database";
import { routes } from "../routes/index";
import { extractQuery } from "../routes/util/extractQuery";

const database = new Database();

export function routeHandler(
  request: http.IncomingMessage,
  response: http.ServerResponse,
) {
  const { method, url } = request;
  console.log(`Received ${method} request for ${url}`);

  const route = routes.find((route) => {
    // console.log(route);
    return route.method === method && route.path.test(url ?? "");
  });

  if (route) {
    const routeParams = url?.match(route.path);
    const { query, ...params } = routeParams?.groups || {};
    request.query = extractQuery(query || "");
    request.params = params;

    console.log("Extracted params:", request.params);
    console.log("Extracted query params:", request.query);

    return route.controller({ request, response, database });
  } else {
    return response
      .writeHead(404)
      .end(JSON.stringify({ message: "Route not found" }));
  }
}
