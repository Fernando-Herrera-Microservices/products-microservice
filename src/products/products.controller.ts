import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @MessagePattern({ dto: 'createProduct' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ dto: 'findAllProduct' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern({ dto: 'findOneProduct' })
  findOne(@Payload('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @MessagePattern({ dto: 'updateProduct' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern({ dto: 'deleteProduct' })
  remove(@Payload('id') id: string) {
    return this.productsService.remove(+id);
  }
}
