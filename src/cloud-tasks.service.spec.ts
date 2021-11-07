import { CloudTasksClient } from '@google-cloud/tasks';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CLOUD_TASKS_CLIENT,
  CLOUD_TASKS_CONFIG,
} from './cloud-tasks.constants';
import { CloudTasksService } from './cloud-tasks.service';
jest.mock('@google-cloud/tasks');

describe('CloudTasksService', () => {
  let service: CloudTasksService;

  beforeEach(async () => {
    const taskClientMock = jest
      .fn<Partial<CloudTasksClient>, any>()
      .mockImplementation(() => ({
        createTask: jest
          .fn()
          .mockImplementation(({ name }) => [{ name: name ?? 'Test' }]),
        queuePath: jest.fn().mockReturnValue('test-queue-path'),
      }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloudTasksService,
        {
          provide: CLOUD_TASKS_CONFIG,
          useValue: {
            projectId: 'test-project-id',
            location: 'test-location',
            queue: 'test-queue',
          },
        },
        {
          provide: CLOUD_TASKS_CLIENT,
          useClass: taskClientMock,
        },
      ],
    }).compile();

    service = module.get<CloudTasksService>(CloudTasksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should fail ');

  it('should do smth', async () => {
    const result = await service.createTask({
      name: 'Hello',
      payload: 'Hello world',
    });

    console.log(result);
  });
});
