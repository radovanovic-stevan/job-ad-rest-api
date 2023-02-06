import { Test, TestingModule } from '@nestjs/testing';
import { JobAdController } from './job-ad.controller';
import { JobAdService } from './job-ad.service';

describe('JobAdController', () => {
  let controller: JobAdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobAdController],
      providers: [JobAdService],
    }).compile();

    controller = module.get<JobAdController>(JobAdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
