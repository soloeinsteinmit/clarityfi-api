import express, { Express } from "express";
import prisma from "./utils/prisma";

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);

  return users;
}

const app: Express = express();
const port = 1235;

app.get("/", (req, res) => {
  const users = main()
  res.send(users);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
