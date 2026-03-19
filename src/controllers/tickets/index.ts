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
  console.log(request.query);
  const filters =
    request.query && Object.keys(request.query).length > 0
      ? request.query
      : undefined;

  const tickets = database.select("tickets", filters);
  console.log(tickets);
  response.writeHead(200).end(JSON.stringify({ tickets }));
}
