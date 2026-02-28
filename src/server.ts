import http from "node:http";

import { jsonHandler } from "./middlewares/jsonHandler";
import { routeHandler } from "./middlewares/routeHandler";

const HTTP_PORT = 3333;

async function listener(
  request: http.IncomingMessage,
  response: http.ServerResponse,
) {
  console.log(`Recebendo request: ${request.method} ${request.url}`);
  await jsonHandler(request, response);
  routeHandler(request, response);
}

http.createServer(listener).listen(HTTP_PORT);

console.log(`Server is running on http://localhost:${HTTP_PORT}`);
