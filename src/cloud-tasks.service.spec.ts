import { Test, TestingModule } from '@nestjs/testing';
import { CloudTasksService } from './cloud-tasks.service';

describe('CloudTasksService', () => {
  let service: CloudTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudTasksService],
    }).compile();

    service = module.get<CloudTasksService>(CloudTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
