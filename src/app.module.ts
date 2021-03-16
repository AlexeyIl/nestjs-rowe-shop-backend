import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from './catalog/catalog.module';
import { join } from 'path'
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail/services/mail.service';
import { AuthModule } from './auth/auth.module';
import { PriceHandlerModule } from './price-handler/price-handler.module';
import { CaptchaModule } from './captcha/captcha.module';
import { MongoDBUri, mailServiceInfo, mailAdress } from './environment';

@Module({
  imports: [
    CatalogModule,
    GraphQLModule.forRoot({
      context: ({req}) => ({ req}),
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // debug: false,
      playground: true,
      uploads: {
        maxFileSize: 10000000, // 10 MB
        maxFiles: 5
      }
    }),
    MongooseModule.forRoot(MongoDBUri.root, { useNewUrlParser: true }),
    UsersModule,
    MailerModule.forRoot({
      transport: mailServiceInfo,
      defaults: {
        from:  `"ROWE Shop" <${mailAdress}>`
      },
      template: {
        dir: __dirname + '/src/mail/template',
        options: {
          strict: true,
        }
      }
    }),
    AuthModule,
    PriceHandlerModule,
    CaptchaModule
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule {}
