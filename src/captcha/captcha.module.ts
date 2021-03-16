import { Module, HttpModule } from '@nestjs/common';
import { CaptchaService } from './captcha.service';

@Module({
  imports: [HttpModule],
  providers: [CaptchaService]
})
export class CaptchaModule {}
