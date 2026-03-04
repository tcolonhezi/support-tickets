/**
 * CREATE - criar
 * INDEX - LISTAR
 * SHOW - MOSTRAR UM REGISTRO
 * UPDATE - ATUALIZAR
 * DELETE - DELETAR
 */

import { ControllerProps } from "../../types/controller";

export function indexTicketsController({
  request,
  response,
  database,
}: ControllerProps) {
  const tickets = database.select("tickets");
  response.writeHead(200).end(JSON.stringify({ tickets }));
}
