import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHouseString } from './utils/convert-minutes-to-hour-string';

const app = express();

app.use(express.json());
app.use(
  cors(),
  // {
  // origin: '*',
  //   }
);

const prisma = new PrismaClient({
  // log: ['query']
});

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return res.json(games);
});

app.get('/games/:id/ads', async (req, res) => {
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
      createdAt: 'desc',
    },
  });

  return res.json(
    ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHouseString(ad.hourStart),
        hourEnd: convertMinutesToHouseString(ad.hourEnd),
      };
    }),
  );
});

app.get('/ads/:id/discord', async (req, res) => {
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

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body: any = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      yearsPlaying: body.yearsPlaying,
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return res.status(201).json(ad);
});

app.listen(3333, () => {
  console.log('server started!');
});
