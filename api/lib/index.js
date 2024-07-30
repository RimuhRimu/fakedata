import express from "express";
import { generateFakeData } from "./ai.js";
import { validateObj } from "../schema/req.js";

const app = express();
app.disable("x-powered-by");
const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

const clientsRequest = {}

const maxRequestInHour = 50

//JSON middleware
app.use(express.json());

//rate limit middleware
app.use((req, res, next) => {
  const currentTime = Date.now()
  const clientIp = req.socket.address().address
  const maxTime = 60 * 60 * 1000 //hours in milliseconds

  if (!clientsRequest[clientIp]) {
    clientsRequest[clientIp] = [{ time: currentTime }]
  } else {
    clientsRequest[clientIp] = clientsRequest[clientIp].filter(request => currentTime - request.time < maxTime)
    if (clientsRequest[clientIp].length > maxRequestInHour) {
      res.status(429).json({ message: "Request limit exceeded, users are limited 50 request per hour, please wait" })
    }
    clientsRequest[clientIp].push({ time: currentTime })
  }

  next()
})

//Fake data handler
app.post("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  const result = validateObj(req.body);

  if (result.error) {
    res.status(422).json({ message: JSON.parse(result.error.message) });
  }

  const { type, description, schema, limit, model } = result.data;

  generateFakeData(type, description, schema, limit, model)
    .then((fakeData) => {
      const types = {
        json: () => {
          res.writeHead(200, {
            "Content-type": "application/json",
          });
          res.end(JSON.stringify(fakeData));
        },
        csv: () => {
          res.writeHead(200, {
            "Content-type": "text/csv",
          });
          res.end(fakeData);
        },
      };
      types[type]();
    })
    .catch(next);
});

//Custom 404 and insternal error
app.use((req, res, next) => {
  res.status(404).end();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
