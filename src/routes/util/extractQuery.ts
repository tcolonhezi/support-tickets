export function extractQuery(query: string): Record<string, string> {
  if (!query || query === "?") return {};

  const search = query.startsWith("?") ? query.slice(1) : query;

  return search.split("&").reduce<Record<string, string>>((query, param) => {
    const [key, value] = param.split("=");
    if (key && value) {
      query[key] = decodeURIComponent(value);
    }

    return query;
  }, {});
}
