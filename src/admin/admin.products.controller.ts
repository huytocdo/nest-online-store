import {
  Controller,
  Get,
  Post,
  Redirect,
  Body,
  Render,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../models/products.service';
import { Product } from '../models/products.entity';

@Controller('/admin/products')
export class AdminProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('/')
  @Render('admin/products/index')
  async index() {
    const viewData = {};
    viewData['title'] = 'Admin Page - Admin - Online Store';
    viewData['products'] = await this.productService.findAll();
    return {
      viewData,
    };
  }

  @Post('/store')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  @Redirect('/admin/products')
  async store(@Body() body, @UploadedFile() file: Express.Multer.File) {
    const newProduct = new Product();
    newProduct.setName(body.name);
    newProduct.setDescription(body.description);
    newProduct.setPrice(body.price);
    newProduct.setImage(file.filename);
    await this.productService.createOrUpdate(newProduct);
  }
}
