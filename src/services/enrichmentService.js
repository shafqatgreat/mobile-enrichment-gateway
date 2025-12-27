import { CONSTANTS } from "../../config/constants.js";
export async function callUpstream(env,{ first_name, last_name, address }) {
    const url = CONSTANTS.PROVIDER_API_URL;  // Ensure no trailing slash
    console.log("Calling upstream provider at:", url);

    // const response = await fetch(url, {
    const response = await env.PROVIDER.fetch(
    "https://internal-provider/",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name, last_name, address })
    });

    const text = await response.text();

    console.log("Upstream response status:", response.status, "body:", text);

    if (!response.ok) {
        throw new Error(`Upstream provider returned ${response.status}: ${text}`);
    }

    return JSON.parse(text);
}
