export function extractQuery(query: string): Record<string, string> {
  return query
    ?.slice(1)
    .split("&")
    .reduce<Record<string, string>>((queryParams, param) => {
      const [key, value] = param.split("=");
      queryParams[key] = value;
      return queryParams;
    }, {});
}
