import express, { Express } from "express";
import prisma from "./utils/prisma";

const app: Express = express();
const port: number = 1235;

app.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
