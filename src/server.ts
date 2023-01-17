import express from 'express';

import { router } from './api/routes';

export class Server {
  private _express: any;

  constructor() {
    this._express = express();

    // Se setean las rutas a express
    this._express.use(router);
  }

  start() {
    return new Promise((resolve, reject) => {
      const http = this._express.listen(3001, () => {
        const { port } = http.address();

        console.info(`🚀 Server running on port ${port}`);

        resolve(true);
      });
    });
  }
}
