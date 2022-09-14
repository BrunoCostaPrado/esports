import express, { response } from "express";
import { request } from "http";

const app = express();

app.get("/games", (req, res) => {
  return res.json([]);
});

app.post("/ads", (req, res) => {
  return res.status(201).json([]);
});

app.get("/ads", (req, res) => {
  console.log("Funcionando");
  return res.json([
    { id: 1, texto: "Anúncio 1" },
    { id: 2, texto: "Anúncio 2" },
    { id: 3, texto: "Anúncio 3" },
    { id: 4, texto: "Anúncio 4" },
  ]);
});

app.listen(3333);
