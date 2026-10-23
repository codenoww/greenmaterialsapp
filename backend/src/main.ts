import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ allow mobile devices on the network to connect
  app.enableCors();

  // ✅ bind to all interfaces, not just localhost
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
