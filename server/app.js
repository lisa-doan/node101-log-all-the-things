const express = require('express');
const fs = require('fs');
const app = express();

let date = new Date();
const headers = "Agent, Time, Method, Resource, Version, Status";

app.use((req, res, next) => {
// write your logging code here
  req.data = {
    Agent: req.headers["user-agent"],
    Time: date.toISOString(),
    Method: req.method,
    Resource: req.path,
    Version: "HTTP/" + req.httpVersion,
    Status: 200,
  };
 next();
});

app.get('/', (req, res) => {
// write your code to respond "ok" here
  res.status(200).send("ok");
  console.log(Object.values(req.data).join(","));
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
  res.status(200).json([headers, req.data]);
});

module.exports = app;
