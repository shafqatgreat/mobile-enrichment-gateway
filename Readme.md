# Mock Enrichment Provider (Cloudflare Worker)

## 📌 Overview

The **Mock Enrichment Provider** is a lightweight Cloudflare Worker that simulates a real-world **mobile enrichment service**.  
It is designed specifically to **test and demonstrate API Gateway integration** with the **Mobile Enrichment Gateway** project.

Instead of relying on a real third-party or paid enrichment API, this service behaves like an **external upstream microservice**, returning structured enrichment data in response to POST requests.

---

## 🎯 Purpose of This Project

This project exists to:

- Simulate a **real upstream enrichment provider**
- Enable **end-to-end testing** of the Mobile Enrichment Gateway
- Demonstrate **API Gateway → Microservice communication**
- Avoid dependency on local mocks that are unreachable from Cloudflare Workers
- Keep development **cloud-native, serverless, and cost-free**

> ⚠️ Since Cloudflare Workers cannot reliably call local services, this mock provider is also deployed on Cloudflare to ensure seamless gateway-to-provider interaction.

---

## 🧱 Architecture Role

In the overall system architecture, this project acts as:

**Upstream Microservice / External Provider**

```text
Client
  ↓
Mobile Enrichment Gateway (API Gateway)
  ↓
Mock Enrichment Provider (This Project)
