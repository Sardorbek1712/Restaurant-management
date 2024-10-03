export declare interface CreateFoodRequest{
    name: string;
    price: number;
    image: Express.Multer.File;
    categoryId: number
}