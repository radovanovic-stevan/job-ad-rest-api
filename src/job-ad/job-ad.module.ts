import { Module } from '@nestjs/common';
import { JobAdService } from './job-ad.service';
import { JobAdController } from './job-ad.controller';

@Module({
  controllers: [JobAdController],
  providers: [JobAdService]
})
export class JobAdModule {}
