export function corsHeaders(origin = "*") {
  const allowedOrigin =
		!origin || origin === "null"
			? "*"
			: origin;

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    "Access-Control-Max-Age": "86400"
  };
}
