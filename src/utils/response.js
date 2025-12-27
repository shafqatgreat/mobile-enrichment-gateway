import { corsHeaders } from "./cors";

export function success(data) {
    return new Response(JSON.stringify(data),
    {
        headers: { "Content-Type": "application/json",...corsHeaders(origin) },
        status: 200
    });
}

export function error(message, status = 400) {
    return new Response(JSON.stringify({ error: message }), {
    headers: { "Content-Type": "application/json",...corsHeaders(origin) },
    status
  });
}