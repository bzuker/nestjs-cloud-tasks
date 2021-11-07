import { CloudTasksClient } from '@google-cloud/tasks';
import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import {
  CLOUD_TASKS_CLIENT,
  CLOUD_TASKS_CONFIG,
} from './cloud-tasks.constants';
import { CloudTasksConfig } from './cloud-tasks.interfaces';
import { CloudTasksService } from './cloud-tasks.service';

@Module({
  providers: [CloudTasksService],
})
export class CloudTasksCoreModule extends createConfigurableDynamicRootModule<
  CloudTasksCoreModule,
  CloudTasksConfig
>(CLOUD_TASKS_CONFIG, {
  providers: [
    {
      provide: CLOUD_TASKS_CLIENT,
      useFactory: (options?: CloudTasksConfig) => {
        return new CloudTasksClient(options);
      },
      inject: [CLOUD_TASKS_CONFIG],
    },
  ],
}) {}
