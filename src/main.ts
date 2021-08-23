import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
// import * as MemcachedStore from 'connect-memcached';
var MemcachedStore = require("connect-memcached")(session);

async function bootstrap() {
  const server = process.env.SERVER_HOST;
  const port = process.env.SERVER_PORT;

  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); 
  app.use(
    session({     
      secret: process.env.SESSION_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 },
      store: new MemcachedStore({
        hosts: [process.env.MEMCACHE_HOST + ':' + process.env.MEMCACHE_PORT],
        secret: process.env.MEMCACHE_SECRET
      })
    }),
  );
  app.use(cookieParser());
  

  await app.listen(port);
  console.log(`App listening on ${server}:${port}`);
}
bootstrap();
