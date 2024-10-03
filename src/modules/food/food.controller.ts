import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.create(createFoodDto);
  }

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.foodService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
