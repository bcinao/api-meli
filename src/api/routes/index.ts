import express, { Router } from 'express';
import cors from 'cors';
import compression from 'compression';
import { json, urlencoded } from 'body-parser';

import { itemsRoutes } from './items.routes';

export const router = Router();

router
  .use(
    cors({
      origin: ['http://localhost:4200'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )
  .use(compression())
  .use(
    urlencoded({
      extended: true,
    })
  )
  .use(json());

// routes api
router.use('/api/items', itemsRoutes);
