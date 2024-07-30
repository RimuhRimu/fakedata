import express from "express";
import { generateFakeData } from "./ai.js";
import { validateObj } from "../schema/req.js";

const app = express();
app.disable("x-powered-by");
const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

//JSON middleware
app.use(express.json());

//Fake data handler
app.post("/api", (req, res, next) => {
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
