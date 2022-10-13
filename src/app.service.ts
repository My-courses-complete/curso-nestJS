import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('PG') private clientPG: Client,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    return apiKey;
  }

  getNowPG() {
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT NOW()', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows[0]);
      });
    });
  }
}
