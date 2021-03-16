import { FilterListSchema } from './schemas/filter-list.schema';
import { SearchNameListSchema } from './schemas/search-name-list.schema';
import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogDBService } from './services/catalog.DBservice';
import { CatalogService } from './services/catalog.service';
import { CatalogResolver } from '../GQL/resolvers/catalog.resolver';
import { ProductSchema } from './schemas/product.schema';
import { RateService } from './services/rate.service';
import { TasksService } from './services/tasks.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Product', schema: ProductSchema},
            {name: 'Search Name List', schema: SearchNameListSchema},
            {name: 'Filter List', schema: FilterListSchema}
        ]),
        HttpModule
    ],
    providers: [CatalogDBService, CatalogService, CatalogResolver, RateService, TasksService]
})
export class CatalogModule {
}
