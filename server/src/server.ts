import express, { response } from "express";
import { request } from "http";

const app = express();

app.get("/games", (req, res) => {
  return res.json([]);
});

app.post("/ads", (req, res) => {
  return res.status(201).json([]);
});

app.get("/games/:id/ads", (req, res) => {
  console.log("Funcionando");
  // const adId = req.params.id;

  return res.json([]);
});

app.listen(3333);
