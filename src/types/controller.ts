import http from "node:http";
import { Database } from "../database/database";
export interface ControllerProps {
  request: http.IncomingMessage;
  response: http.ServerResponse;
  database: Database;
}
