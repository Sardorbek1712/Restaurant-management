import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FoodService {
  // #_uploadService = UploadService
  #_jwtService: JwtService

  create(createFoodDto: CreateFoodDto) {
    return 'This action adds a new food';
  }

  findAll() {
    return `This action returns all food`;
  }

  findOne(id: number) {
    return `This action returns a #${id} food`;
  }

  update(id: number) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
