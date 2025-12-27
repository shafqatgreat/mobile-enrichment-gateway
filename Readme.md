# Mock Enrichment Provider  
_Serverless Mock Upstream API using Cloudflare Workers_

## 📌 Overview

**Mock Enrichment Provider** is a lightweight, serverless Cloudflare Workers project that simulates a real-world mobile enrichment service.

It acts as an **upstream microservice** for the **Mobile-Enrichment-Gateway** project, allowing developers to test, validate, and demonstrate **API Gateway concepts** without relying on an actual third-party provider.

This project intentionally keeps logic simple while preserving **realistic architecture and interaction patterns** found in production systems.

---

## 🎯 Purpose of This Project

This project is designed to:

- Simulate a **third-party or internal enrichment API**
- Enable **end-to-end testing** of the Mobile-Enrichment-Gateway
- Demonstrate how an API Gateway communicates with upstream services
- Avoid dependency on local mock servers
- Ensure compatibility with **Cloudflare-hosted gateway deployments**

> Since the Mobile-Enrichment-Gateway is deployed on Cloudflare Workers, it **cannot reliably interact with local services**.  
> Therefore, this mock provider is also deployed on Cloudflare to behave like a **real online upstream API**.

---

## 🧱 Architecture Role

In the overall system, this project represents:

- A **paid third-party enrichment API**
- An **external microservice owned by another team**
- A **legacy or partner system**
- A **remote cloud-hosted service**

```

Client → Mobile-Enrichment-Gateway → Mock-Enrichment-Provider

```

The gateway calls this service, processes the response, sanitizes it, and returns a controlled output to clients.

---

## 🚀 Features

- Cloudflare Workers based (serverless, globally distributed)
- Accepts POST requests
- Returns simulated enrichment data:
  - Mobile number
  - Confidence score
  - Request ID
- Stateless and fast
- Ideal for integration testing

---

## 📡 API Behavior

### Endpoint
```

POST /

````

### Request Body (JSON)
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "address": "Lahore, Pakistan"
}
````

### Sample Response

```json
{
  "mobile": "+923001234567",
  "confidence": 0.85,
  "request_id": "c1a4f8c4-7b0e-4e5c-bb64-9e8b12c1d912"
}
```

---

## 🧩 Code Example (index.ts)

```ts
export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const body = await request.json();

    return Response.json({
      mobile: "+92" + Math.floor(3000000000 + Math.random() * 999999999),
      confidence: 0.85,
      request_id: crypto.randomUUID(),
    });
  }
};
```

---

## 🛠️ Development & Deployment

### Install Wrangler

```bash
npm install -g wrangler
```

### Login to Cloudflare

```bash
wrangler login
```

### Run Locally

```bash
npx wrangler dev
```

### Deploy to Cloudflare

```bash
npx wrangler deploy
```

After deployment, Cloudflare assigns a public URL ending with:

```
workers.dev
```

This is Cloudflare’s default **development subdomain**, even for production-ready deployments.

---

## 🔗 Integration with Mobile-Enrichment-Gateway

This project is **specifically used to test and validate**:

* Upstream service calling
* Authorization header forwarding
* Error handling
* Response sanitization
* Gateway-to-microservice communication

The Mobile-Enrichment-Gateway treats this service exactly like a **real external provider**.

---

## 📦 Tech Stack

* Cloudflare Workers
* TypeScript
* Wrangler CLI
* Serverless Architecture

---

## 🧠 Key Takeaway

This mock provider is **not just a dummy API** — it is a **critical architectural component** that enables realistic API Gateway demonstrations while remaining:

* Cost-free
* Fast
* Cloud-native
* Production-aligned

---

## 📄 License

MIT License
Free to use for learning, demos, and experimentation.

---

## 👤 Author

Shafqat Altaf
Serverless • Microservices • API Gateway Architectures

