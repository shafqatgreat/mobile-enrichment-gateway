import { corsHeaders } from "./utils/cors";
import { authenticate } from "./middleware/auth.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { checkIdempotency, storeIdempotency, generateRequestId } from "./middleware/idempotency.js";
import { callUpstream } from "./services/enrichmentService.js";
import { success, error } from "./utils/response.js";
import { validateInput } from "./utils/validator.js";


export default {
	async fetch(request, env) {
		try {
			
			const origin = request.headers.get("Origin") || "*";
			
			// ✅ Handle CORS preflight
			if (request.method === "OPTIONS") {
				return new Response(null, {
					status: 204,
					headers: corsHeaders(origin)
				});
			}

			// 1️⃣ Authentication
			if (!authenticate(request)) {
				return error("Unauthorized", 401,origin);
			}

			// 2️⃣ Rate limiting
			const apiKey = request.headers.get("x-api-key");
			if (!rateLimiter(apiKey)) {
				return error("Rate limit exceeded", 429,origin);
			}

			// 3️⃣ Parse request
			const data = await request.json();

			// 4️⃣ Validate input
			if (!validateInput(data)) {
				return error("Invalid input", 400,origin);
			}

			// 5️⃣ Idempotency
			const requestId = await generateRequestId(data);
			// const requestId = data.request_id || createHash('sha256').update(JSON.stringify(data)).digest('hex');
			// const requestId = data.request_id;
			const cached = checkIdempotency(requestId);
			if (cached) return success(cached);

			// 6️⃣ Call upstream provider
			const providerData = await callUpstream(env,data);

			// 7️⃣ Sanitize response
			const result = {
				mobile: providerData.mobile || null,
				confidence: providerData.confidence || 0,
				request_id: providerData.request_id || null,
				clientProvidedData: providerData.receivedClientData

      		};

			// 8️⃣ Store idempotency
			storeIdempotency(requestId, result);

			// 9️⃣ Return response
			return success(result,origin);
		
		} catch (err) {
      		return error(err.message, 500,origin);
    	}
		
	}
};