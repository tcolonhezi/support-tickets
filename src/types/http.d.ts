declare module "node:http" {
  interface IncomingMessage {
    body?: Record<string, any> | null;
    query?: Record<string, string>;
    params?: Record<string, string>;
  }
}
