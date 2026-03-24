import { ControllerProps } from "../../types/controller";
import { Ticket } from "../../types/ticket";

export function deleteTicketController({
  request,
  response,
  database,
}: ControllerProps) {
  const id = request.params?.id;

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

  const deleted = database.delete("tickets", id);
  if (!deleted) {
    response.writeHead(500).end(
      JSON.stringify({
        message: "Erro ao deletar o ticket.",
      }),
    );
    console.error("Error deleting ticket.");
    return;
  }
  console.log("Deleted ticket with ID:", id);
  response.end(
    JSON.stringify({
      message: "Ticket deleted successfully",
    }),
  );
}
