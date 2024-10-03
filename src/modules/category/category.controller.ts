import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('/categories')
export class CategoryController {
  #_service: CategoryService;
  constructor(service: CategoryService) {
    this.#_service = service;
  }

  @Post('/add')
  async createCategory(
    @Body() createCategoryPayload: CreateCategoryDto,
  ): Promise<void> {
    await this.#_service.createCategory(createCategoryPayload);
  }

  @ApiOperation({description: 'Barcha categorieslarni olish', summary: "Hammasini olish"})
  @Get('/all')
  async getAllCategory() {
    return await this.#_service.getAllCategory();
  }

  @Put('/update/:categoryId')
  async updateCategory(
    @Body() updateCategoryPayload: UpdateCategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.#_service.updateCategory({
      ...updateCategoryPayload,
      id: categoryId,
    });
  }

  @Delete('/delete/:categoryId')
  async deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.#_service.deleteCategory(categoryId);
  }
}
