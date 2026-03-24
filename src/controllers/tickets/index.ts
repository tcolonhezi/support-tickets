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
  let filters: Record<string, any> | undefined = undefined;
  console.log("Request query:", request.query);
  console.log("Request params:", request.params);

  const combinedFilters = {
    ...request.query,
    ...request.params,
  };

  if (Object.keys(combinedFilters).length > 0) {
    filters = combinedFilters;
  }

  const tickets = database.select("tickets", filters);

  response.writeHead(200).end(JSON.stringify({ tickets }));
}
