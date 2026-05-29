import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.ts";
import express from "express";
const app = express();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: adapter });
//await prisma.evalution.create({data:{teacher:"M.E",message:"チャンネル"}})
app.use(express.json());
app.use(express.static("./public"));
app.post("/display", async (request, response) => {
  const posts = await prisma.evalution.findMany({where:{teacher:request.body.teacher}});
  response.json(posts);
});
app.post("/posts", async (request, response) => {
  const { id, ...data } = request.body;
  await prisma.evalution.create({ data });
  response.sendStatus(201); // Created（新しいメッセージを作成）
});
const evalutions = await prisma.evalution.findMany();
console.log(evalutions);
const port =process.env.PORT || 3000;
app.listen(port/*, "0.0.0.0"*/);