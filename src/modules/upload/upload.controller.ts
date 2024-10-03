import { Body, Controller, Delete, PayloadTooLargeException, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { RemoveFileDto, UploadFileDto } from "./dto";
import { RemoveFileResponse, UploadFileResponse } from "./interfaces";

@ApiTags("Upload")
@Controller("uploads")
export class UploadController {
  constructor(private service: UploadService) {}

  @Post('/add')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() payload: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponse> {
    return await this.service.uploadFile({...payload, file});
  }

  @Delete("/delete")
  async removeFile(
    @Body() payload: RemoveFileDto,
  ): Promise<RemoveFileResponse>{
    return this.service.removeFile(payload)
  }
}