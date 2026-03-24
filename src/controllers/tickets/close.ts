import { ControllerProps } from "../../types/controller";
import { Ticket } from "../../types/ticket";

type ClosedTicketDTO = Partial<
  Omit<Ticket, "id" | "created_at" | "updated_at">
>;

export function updateStatusController({
  request,
  response,
  database,
}: ControllerProps) {
  const id = request.params?.id;
  const status = request.params?.status;
  const solution = request.body?.solution as string | undefined;

  if (!solution) {
    response.writeHead(400).end(
      JSON.stringify({
        message: "Solução é obrigatória para fechar o ticket.",
      }),
    );
    console.error("Solution is required to close the ticket.");
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

  const updatedTicketData = database.update("tickets", id, {
    status: "closed",
    solution,
    updated_at: new Date(),
  });

  if (!updatedTicketData) {
    response.writeHead(500).end(
      JSON.stringify({
        message: "Erro ao atualizar o ticket.",
      }),
    );
    console.error("Error updating ticket.");
    return;
  }

  console.log("Updating ticket with ID:", id, "with data:", updatedTicketData);
  response.end(
    JSON.stringify({
      message: "Ticket updated successfully",
      data: updatedTicketData,
    }),
  );
}
