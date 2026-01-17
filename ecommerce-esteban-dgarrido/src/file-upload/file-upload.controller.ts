import {
  BadRequestException,
  Controller,
  //FileTypeValidator,
  //MaxFileSizeValidator,
  Param,
  //ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file')) //* form-data: {file: buffer}
  async uploadImage(
    //* 1. Id
    @Param('id') productId: string,
    //* 2. Imagen
    //   @UploadedFile(
    //     new ParseFilePipe({
    //       validators: [
    //         new MaxFileSizeValidator({
    //           maxSize: 200000,
    //           message: ' Supera el máximo permitido de 200kb',
    //         }),
    //         // new FileTypeValidator({
    //         //   fileType: /(.jpg|.jpeg|.png|.webp|.svg)/,
    //         // }),
    //       ],
    //     }),
    //   )
    //   file: Express.Multer.File,
    // ) {
    // console.log(file);
    @UploadedFile() file: Express.Multer.File,
  ) {
    const maxSize = 200_000;
    const mimeRegex = /image\/(jpeg|jpg|png|svg\+xml|webp)/;

    if (!file) {
      throw new BadRequestException('No se subió ningún archivo');
    }

    if (file.size > maxSize) {
      throw new BadRequestException('Supera el peso máximo de 200kb');
    }

    if (!mimeRegex.test(file.mimetype)) {
      throw new BadRequestException(
        `Validation failed (current file type is ${file.mimetype})`,
      );
    }

    return this.fileUploadService.uploadImage(file, productId);
  }
}
//? Esto último tuve que hacerlo sin pipes porque tengo un error propio de la libreria
//? Parece que toca hacer la validación manual y pues igual dejo comentado lo que hizo el profe
