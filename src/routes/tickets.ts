import { createTicketController } from "../controllers/tickets/create";
import { Route } from "./routes";

export function ticketsRoute(): Route {
  return {
    method: "POST",
    path: "/tickets",
    controller: createTicketController,
  };
}
