import http from "node:http";

export interface Route {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string | RegExp;
  controller: ({ request, response }: ControllerProps) => void | Promise<void>;
}

import { ticketsRoute } from "./tickets";
import { ControllerProps } from "../controllers/tickets/create";

export function getRoutes() {
  return [ticketsRoute()];
}
