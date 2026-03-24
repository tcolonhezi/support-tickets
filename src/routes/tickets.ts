import { indexTicketsController } from "../controllers/tickets";
import { updateStatusController } from "../controllers/tickets/close";
import { createTicketController } from "../controllers/tickets/create";
import { deleteTicketController } from "../controllers/tickets/delete";
import { updateTicketController } from "../controllers/tickets/update";
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
    {
      method: "PUT",
      path: "/tickets/:id",
      controller: updateTicketController,
    },
    {
      method: "PATCH",
      path: "/tickets/:id/close",
      controller: updateStatusController,
    },
    {
      method: "DELETE",
      path: "/tickets/:id",
      controller: deleteTicketController,
    },
  ];
}
