import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobAdModule } from './job-ad/job-ad.module';

@Module({
  imports: [JobAdModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
