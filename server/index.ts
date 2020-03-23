import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './ApplicationModule';

const BASE_PATH = 'api';

const runServer = async (port: string | number): Promise<void> => {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(BASE_PATH);
  const options = new DocumentBuilder()
    .setTitle('ow-app')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  return app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`aura-app service running on ${port}`)
  );
};

const port = process.env.PORT || 8309;

runServer(port);
