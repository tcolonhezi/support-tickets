import { indexTicketsController } from "../controllers/tickets";
import { createTicketController } from "../controllers/tickets/create";
import { Route } from "./routes";

export function ticketsRoute(): Route[] {
  return [
    {
      method: "POST",
      path: "/tickets",
      controller: createTicketController,
    },
    {
      method: "GET",
      path: "/tickets",
      controller: indexTicketsController,
    },
  ];
}
