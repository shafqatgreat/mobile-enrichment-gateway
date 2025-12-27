const requestMap = new Map();

export function checkIdempotency(requestId) {

    if (!requestId) return null;
    
    if (requestMap.has(requestId)) {
        return requestMap.get(requestId);
    }

    return null;
}

export function storeIdempotency(requestId, response) {
    if (!requestId) return;
    requestMap.set(requestId, response);

}

export async function generateRequestId(payload) {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(payload));
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
