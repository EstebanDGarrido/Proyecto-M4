import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly ormProductRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = this.ormProductRepository.findOneBy({
      id: productId,
    });
    if (!product)
      throw new NotFoundException(
        `Producto con id: ${productId} no encontrado`,
      );
    const response = await this.fileUploadRepository.uploadImage(file);
    if (!response.secure_url)
      throw new NotFoundException('Error al cargar la imagen en Cloudinary');
    await this.ormProductRepository.update(productId, {
      imgUrl: response.secure_url,
    });
    const updatedProduct = await this.ormProductRepository.findOneBy({
      id: productId,
    });
    return updatedProduct;
  }
}
