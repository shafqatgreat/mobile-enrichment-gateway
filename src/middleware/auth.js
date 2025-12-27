import { CONSTANTS } from "../../config/constants.js";

export function authenticate(request) {
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || apiKey !== CONSTANTS.WORKER_API_KEY) {
    return false;
  }
  return true;
}