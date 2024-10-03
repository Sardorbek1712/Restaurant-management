import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import * as morgan from "morgan" 
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  // SET GLOBAL PREFIX TO /api/v1
  app.setGlobalPrefix("/api/v1")

  const config = new DocumentBuilder()
  .setTitle('Restaurant Management API')
  .setDescription('Restaurant management API description')
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  // USE MORGAN IN DEVELOPMENT MODE
  if(process.env?.NODE_ENV?.trim() == 'development'){
    app.use(morgan('tiny'))
  }
  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(`Listening on port ${configService.get<number>('appConfig.port')}...`)
  });
}
bootstrap();
