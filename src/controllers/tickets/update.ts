import { ControllerProps } from "../../types/controller";
import { Ticket } from "../../types/ticket";

type UpdateTicketDTO = Partial<
  Omit<Ticket, "id" | "created_at" | "updated_at">
>;

export function updateTicketController({
  request,
  response,
  database,
}: ControllerProps) {
  const id = request.params?.id;
  const body = request.body as UpdateTicketDTO;

  if (!body || Object.keys(body).length === 0) {
    response.writeHead(400).end(
      JSON.stringify({
        message: "O corpo da requisição é obrigatório.",
      }),
    );
    console.error("Request body is required.");
    return;
  }

  if (!id) {
    response.writeHead(400).end(
      JSON.stringify({
        message: "ID do ticket é obrigatório.",
      }),
    );
    console.error("Ticket ID is required.");
    return;
  }

  const existingTicket = database.select("tickets", { id })[0] as Ticket;
  if (!existingTicket) {
    response.writeHead(404).end(
      JSON.stringify({
        message: "Ticket não encontrado.",
      }),
    );
    console.error("Ticket not found.");
    return;
  }

  const updatedTicket: Ticket = {
    ...existingTicket,
    ...body,
    updated_at: new Date(),
  };

  const updatedTicketData = database.update("tickets", id, updatedTicket);
  if (!updatedTicketData) {
    response.writeHead(500).end(
      JSON.stringify({
        message: "Erro ao atualizar o ticket.",
      }),
    );
    console.error("Error updating ticket.");
    return;
  }

  console.log("Updating ticket with ID:", id, "with data:", body);
  response.end(
    JSON.stringify({
      message: "Ticket updated successfully",
      data: updatedTicketData,
    }),
  );
}
