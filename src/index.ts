<<<<<<< HEAD
// index.ts
import express from "express";
import dbConnection from "./db-connection"; 

dbConnection();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Express + MongoDB Atlas API!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
=======
import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is up and running 💫");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});
>>>>>>> main
