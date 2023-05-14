import {
  Controller,
  Get,
  Post,
  Redirect,
  Body,
  Render,
  UseInterceptors,
  UploadedFile,
  Param,
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

  @Post('/:id')
  @Redirect('/admin/products')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Get('/:id')
  @Render('admin/products/edit')
  async edit(@Param('id') id: string) {
    const viewData = {};
    viewData['title'] = 'Admin Page - Edit Product - Online Store';
    viewData['product'] = await this.productService.findOne(Number(id));
    return {
      viewData: viewData,
    };
  }

  @Post('/:id/update')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  @Redirect('/admin/products')
  async update(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const product = await this.productService.findOne(Number(id));
    product.setName(body.name);
    product.setDescription(body.description);
    product.setPrice(body.price);
    if (file) {
      product.setImage(file.filename);
    }
    await this.productService.createOrUpdate(product);
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
