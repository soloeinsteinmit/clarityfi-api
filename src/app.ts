import express, { Express } from "express";

const app: Express = express();
const port = 1234;

app.get("/", (req, res) => {
  res.send("Hello world...!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
