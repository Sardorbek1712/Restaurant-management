import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { CreateFoodRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFoodDto implements Omit<CreateFoodRequest, 'image'> {
    @ApiProperty({
        type: String,
        example: 'Big Burger',
        required: true,
        description: 'Taom nomi berilishi shart!'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumberString()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        type: String,
        format: 'binary',
        required: true,
        description: 'Taomm rasmi Yuklanishi shart',
    })
    image: any;

    @ApiProperty({
        type: Number,
        example: 1,
        required: true,
        description: 'Taomm Category Id si berilishi shart!',
    })
    @IsNumberString()
    @IsNotEmpty()
    categoryId: number;
}
