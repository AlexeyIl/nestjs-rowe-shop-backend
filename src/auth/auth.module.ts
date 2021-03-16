import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserResolver } from '../GQL/resolvers/user.resolver';
import { PassportModule } from '@nestjs/passport';
import { AdminResolver } from '../GQL/resolvers/admin.resolver';
import { PriceUploadService } from '../price-handler/price-upload.service';
import { PriceHandlerDbService } from '../price-handler/price-handler-db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../catalog/schemas/product.schema';
import { EmailVerificationService } from '../users/services/email-verification.service';
import { UsersDbService } from '../users/services/users-db.service';
import { NoLoggedUserSchema } from '../users/schemas/no-logged-user.schema';
import { OrderSchema } from '../users/schemas/order.schema';
import { UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '6200 days' },
  }),
  UsersModule,
  MongooseModule.forFeature([
    {name: 'Product', schema: ProductSchema},
    {name: 'NoLoggedUsers', schema: NoLoggedUserSchema},
    {name: 'Orders', schema: OrderSchema},
    {name: 'users', schema: UserSchema}
])
],
  providers: [AuthService, JwtStrategy, UserResolver, AdminResolver, PriceUploadService, PriceHandlerDbService, EmailVerificationService, UsersDbService],
  exports: [AuthService]
})
export class AuthModule {}
