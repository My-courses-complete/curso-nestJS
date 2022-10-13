import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';

const API_KEY = '123456';
const API_KEY_PROD = 'PROD123456';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: '1234',
  database: 'postgres',
});

client.connect();

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
