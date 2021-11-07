import { CloudTasksClient } from '@google-cloud/tasks';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CloudTasksModule } from './cloud-tasks.module';
import { CloudTasksService } from './cloud-tasks.service';

describe('CloudTasksModule', () => {
  let app: INestApplication;

  describe('forRoot', () => {
    it('should compile without options', async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [CloudTasksModule.forRoot()],
      }).compile();

      app = module.createNestApplication();
      await app.init();
      await app.close();
    });

    it('provides CloudTasksService', async () => {
      const cloudTasksService = app.get(CloudTasksService);
      expect(cloudTasksService).toBeInstanceOf(CloudTasksService);
      const client = cloudTasksService.getClient();
      expect(client).toBeInstanceOf(CloudTasksClient);
    });
  });

  describe('forRootAsync', () => {
    it('should compile with options', async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          CloudTasksModule.forRootAsync({
            useFactory: () => {
              return {
                queue: 'my-queue',
                projectId: 'my-project',
                url: 'https://my-url.com',
              };
            },
          }),
        ],
      }).compile();

      app = module.createNestApplication();
      await app.init();
      await app.close();
    });

    it('provides CloudTasksService', async () => {
      const cloudTasksService = app.get(CloudTasksService);
      expect(cloudTasksService).toBeInstanceOf(CloudTasksService);
      const client = cloudTasksService.getClient();
      expect(client).toBeInstanceOf(CloudTasksClient);
      expect(await client.getProjectId()).toBe('my-project');
    });
  });
});
