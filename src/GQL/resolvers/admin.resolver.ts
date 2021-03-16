import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { PriceUploadService } from '../../price-handler/price-upload.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserFromTokenInterface } from '../../auth/auth.interface';
import { CurrentUser } from '../user.decorator';
import { UserService } from '../../users/services/user.service';

@Resolver()
export class AdminResolver {
  constructor(
      private priceUploadService: PriceUploadService,
      private userService: UserService) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    files: FileUpload,
    @CurrentUser()user: UserFromTokenInterface
  ): Promise<boolean> {
    if(await this.userService.checkIsAdmin(user.userId)){
        return this.priceUploadService.parsePrice(files);
    }
    return false
  }
}
