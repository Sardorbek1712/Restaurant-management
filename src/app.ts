import { appConfig, dbConfig } from "@config";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryModule } from "./modules/category/category.module";
import { FoodModule } from "@modules";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get('database.host'),
            port: config.get<number>('database.port'),
            username: config.get('database.user'),
            password: config.get('database.password'),
            database: config.get('database.dbName'),
            models: [],
            synchronize: true,
            // sync: {force: true},
            logging: console.log,
            autoLoadModels: true,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
    CategoryModule,
    FoodModule
  ],
  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    },
  ],
})
export class AppModule {}

