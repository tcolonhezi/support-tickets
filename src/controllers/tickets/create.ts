import http from "node:http";

export interface ControllerProps {
  request: http.IncomingMessage;
  response: http.ServerResponse;
}

export function createTicketController({ request, response }: ControllerProps) {
  response.end(JSON.stringify({ message: "Ticket created successfully" }));
}
