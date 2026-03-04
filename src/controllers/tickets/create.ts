import { ControllerProps } from "../../types/controller";
import { Ticket } from "./../../types/ticket";
import { randomUUID } from "node:crypto";

export function createTicketController({
  request,
  response,
  database,
}: ControllerProps) {
  if (!request.body) {
    response.writeHead(400).end(
      JSON.stringify({
        message: "Corpo da requisição é vazio ou inválido.",
      }),
    );
    console.error("Request body is empty or invalid.");
    return;
  }
  const { equipment, description, user_name } = request.body as Ticket;

  if (!equipment || !description || !user_name) {
    response.writeHead(400).end(
      JSON.stringify({
        message: "Campos obrigatórios: equipment, description e user_name",
      }),
    );
    console.error("Missing required fields: equipment, description, user_name");
    return;
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
    response
      .writeHead(500)
      .end(JSON.stringify({ message: "Internal server error" }));
    return;
  }
  console.log("New ticket created:", ticket);
  response
    .writeHead(201)
    .end(JSON.stringify({ ticket, message: "Ticket created successfully" }));
}
