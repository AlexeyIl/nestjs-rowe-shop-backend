import { Module } from '@nestjs/common';
import { PriceUploadService } from './price-upload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../catalog/schemas/product.schema';
import { PriceHandlerDbService } from './price-handler-db.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Product', schema: ProductSchema}
])],
  providers: [PriceUploadService, PriceHandlerDbService],
  exports: [PriceUploadService, PriceHandlerDbService]
})
export class PriceHandlerModule {
}
