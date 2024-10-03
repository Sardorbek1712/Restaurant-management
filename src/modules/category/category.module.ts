import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
