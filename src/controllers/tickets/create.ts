import { Ticket } from "./../../types/ticket";
import http from "node:http";
import { randomUUID } from "node:crypto";
import { Database } from "../../database/database";

export interface ControllerProps {
  request: http.IncomingMessage;
  response: http.ServerResponse;
  database: Database;
}

export function createTicketController({
  request,
  response,
  database,
}: ControllerProps) {
  if (!request.body) {
    return response.writeHead(400).end(
      JSON.stringify({
        message: "Corpo da requisição é vazio ou inválido.",
      }),
    );
  }
  const { equipment, description, user_name } = request.body as Ticket;

  if (!equipment || !description || !user_name) {
    return response.writeHead(400).end(
      JSON.stringify({
        message: "Campos obrigatórios: equipment, description e user_name",
      }),
    );
  }

  const ticket: Ticket = {
    id: randomUUID(),
    equipment,
    description,
    user_name,
    status: "open",
    created_at: new Date(),
    updated_at: new Date(),
  };
  const success = database.insert("tickets", ticket);
  if (!success) {
    return response
      .writeHead(500)
      .end(JSON.stringify({ message: "Internal server error" }));
  }
  console.log("New ticket created:", ticket);
  response.end(JSON.stringify({ message: "Ticket created successfully" }));
}
