const express = require("express");
const app = express();
const client = require('prom-client');

const counter = new client.Counter({
    name: "api_hit_count",
    help: "Number of times the API was called"
});

app.get("/", (req, res) => {
    counter.inc();
    res.json({ message: "Hello from CI/CD Pipeline!" });
});

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

module.exports = app;
