import { CloudTasksClient } from '@google-cloud/tasks';
import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import {
  CLOUD_TASKS_CLIENT_TOKEN,
  CLOUD_TASKS_CONFIG_TOKEN,
} from './cloud-tasks.constants';
import { CloudTasksConfig } from './cloud-tasks.interfaces';
import { CloudTasksService } from './cloud-tasks.service';

@Module({
  providers: [CloudTasksService],
})
export class CloudTasksModule extends createConfigurableDynamicRootModule<
  CloudTasksModule,
  CloudTasksConfig
>(CLOUD_TASKS_CONFIG_TOKEN, {
  providers: [
    {
      provide: CLOUD_TASKS_CLIENT_TOKEN,
      useFactory: (options: CloudTasksConfig) => {
        return new CloudTasksClient();
      },
      inject: [CLOUD_TASKS_CONFIG_TOKEN],
    },
  ],
}) {}
