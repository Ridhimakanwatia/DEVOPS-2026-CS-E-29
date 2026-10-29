const client = require("prom-client");

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests handled by the API.",
  labelNames: ["method", "route", "status_code"],
  registers: [register]
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds.",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
  registers: [register]
});

const httpActiveRequests = new client.Gauge({
  name: "http_active_requests",
  help: "Number of HTTP requests currently being handled.",
  registers: [register]
});

function routeName(request) {
  if (!request.route) return "not_found";
  return `${request.baseUrl || ""}${request.route.path}`;
}

function metricsMiddleware(request, response, next) {
  const start = process.hrtime.bigint();
  let recorded = false;
  httpActiveRequests.inc();

  const recordRequest = () => {
    if (recorded) return;
    recorded = true;

    const labels = {
      method: request.method,
      route: routeName(request),
      status_code: String(response.statusCode)
    };
    const durationSeconds = Number(process.hrtime.bigint() - start) / 1e9;

    httpRequestsTotal.inc(labels);
    httpRequestDuration.observe(labels, durationSeconds);
    httpActiveRequests.dec();
  };

  response.once("finish", recordRequest);
  response.once("close", recordRequest);

  next();
}

async function metricsHandler(request, response) {
  response.set("Content-Type", register.contentType);
  response.end(await register.metrics());
}

module.exports = { metricsHandler, metricsMiddleware };
