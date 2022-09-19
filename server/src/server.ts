import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { ConvertHourStringToMinutes } from "./utils/convert-hour-string-to-minute";
import { ConvertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const app = express();
app.use(cors());

app.use(express.json());

const prisma = new PrismaClient({
  // log: ["query"],
});

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: { select: { ads: true } },
    },
  });

  return res.json([games]);
});

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: ConvertHourStringToMinutes(body.hourStart),
      hourEnd: ConvertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (req, res) => {
  console.log("Funcionando");
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(
    ads.map((ad) => {
      return {
        ...ads,
        weekDays: ad.weekDays.split(","),
        hourStart: ConvertMinutesToHourString(ad.hourStart),
        hourEnd: ConvertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return res.json({
    discord: ad.discord,
  });
});

app.listen(3333);
