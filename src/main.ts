import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const server = process.env.SERVER_HOST || 'http://localhost';
  const port = process.env.SERVER_PORT || 3000;

  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());
 
  await app.listen(port);

  console.log(`App listening on ${server}:${port}`);
}
bootstrap();
