import http from "node:http";

export interface Route {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string | RegExp;
  controller: ({
    request,
    response,
    database,
  }: ControllerProps) => void | Promise<void>;
}

import { ticketsRoute } from "./tickets";
import { ControllerProps } from "../types/controller";

export function getRoutes() {
  return [ticketsRoute()];
}
