// index.ts
import express from "express";
import router from "./routes";
import dbConnection from "./db-connection"; 

dbConnection();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("Welcome to Express + MongoDB Atlas API!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
