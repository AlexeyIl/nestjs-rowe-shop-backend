import { HelpRequestResolver } from './../GQL/resolvers/help-requests.resolver';
import { WholesaleRequestSchema } from './schemas/wholesale-request.schema';
import { OilRequestSchema } from './schemas/oil-choose-help.schema';
import { CallRequestSchema } from './schemas/call-request.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoLoggedUserSchema } from './schemas/no-logged-user.schema';
import { UserService } from './services/user.service';
import { UsersDbService } from './services/users-db.service';
import { NoLoggedUsersResolver } from '../GQL/resolvers/no-logged-users.resolver';
import { OrderSchema } from './schemas/order.schema';
import { OrderDbService } from './services/order-db.service';
import { OrderResolver } from '../GQL/resolvers/orders.resolver';
import { MailService } from '../mail/services/mail.service';
import { OrderService } from './services/order.service';
import { UserSchema } from './schemas/user.schema';
import { SecureService } from './services/secure.service';
import { EmailVerificationService } from './services/email-verification.service';
import { UserOrderSchema } from './schemas/user-order.schema';
import { PasswordRecoveryService } from './services/password-recovery.service';
import { HelpRequestsService } from './services/help-requests.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NoLoggedUsers', schema: NoLoggedUserSchema },
      { name: 'Orders', schema: OrderSchema },
      { name: 'users', schema: UserSchema },
      { name: 'UserOrders', schema: UserOrderSchema },
      { name: 'Call Request', schema: CallRequestSchema},
      { name: 'Oil Choose Help', schema: OilRequestSchema},
      { name: 'Wholesale Request', schema: WholesaleRequestSchema}
    ]),
  ],
  providers: [
    UserService,
    UsersDbService,
    NoLoggedUsersResolver,
    HelpRequestResolver,
    OrderDbService,
    OrderResolver,
    MailService,
    OrderService,
    SecureService,
    EmailVerificationService,
    PasswordRecoveryService,
    HelpRequestsService,
  ],
  exports: [
    UserService,
    SecureService,
    EmailVerificationService,
    UsersDbService,
    PasswordRecoveryService,
  ],
})
export class UsersModule {}
