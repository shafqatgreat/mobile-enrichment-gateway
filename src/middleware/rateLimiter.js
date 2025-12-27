const rateLimitMap = new Map();

export function rateLimiter(apiKey) {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests=5;

    const record = rateLimitMap.get(apiKey) || {count: 0, startTime: now };

    if(now - record.startTime > windowMs)
    {
        // Reset window
        record.count = 1;
        record.startTime = now;
        rateLimitMap.set(apiKey, record);
        return true;
    }

    if (record.count < maxRequests) {
        record.count++;
        rateLimitMap.set(apiKey, record);
        return true;    
    }
    
    return false;

}