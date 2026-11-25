export const formatDate = (value?: string | null) =>
  value ? value.slice(0, 10).replaceAll("-", ".") : "";
