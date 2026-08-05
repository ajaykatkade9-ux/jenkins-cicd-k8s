const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = 3000;

// Create a Registry
const register = new client.Registry();

// Collect default metrics (CPU, Memory, Event Loop, etc.)
client.collectDefaultMetrics({
  register,
});

// Custom metric - HTTP request counter
const httpRequests = new client.Counter({
  name: "nodejs_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

register.registerMetric(httpRequests);

// Home Route
app.get("/", (req, res) => {
  httpRequests.inc({
    method: req.method,
    route: "/",
    status: 200,
  });

  res.send("🚀 Jenkins CI/CD Pipeline with Prometheus Monitoring!");
});

// Health Check
app.get("/health", (req, res) => {
  httpRequests.inc({
    method: req.method,
    route: "/health",
    status: 200,
  });

  res.send("OK");
});

// Metrics Endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
