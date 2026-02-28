import http from "node:http";

declare module "node:http" {
  interface IncomingMessage {
    body?: Record<string, any> | null;
  }
}

export async function jsonHandler(
  request: http.IncomingMessage,
  response: http.ServerResponse,
) {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }
  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    request.body = null;
  }

  response.setHeader("Content-Type", "application/json");
}
