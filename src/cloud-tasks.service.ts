import { CloudTasksClient, protos } from '@google-cloud/tasks';
import { Injectable } from '@nestjs/common';
import {
  InjectCloudTasksClient,
  InjectCloudTasksConfig,
} from './cloud-tasks.decorators';
import { CloudTasksError } from './cloud-tasks.errors';
import {
  CloudTasksConfig,
  CreateTaskOptions,
  QueueParams,
  ScheduleTaskOptions,
} from './cloud-tasks.interfaces';

@Injectable()
export class CloudTasksService {
  constructor(
    @InjectCloudTasksConfig() private readonly config: CloudTasksConfig,
    @InjectCloudTasksClient() private readonly client: CloudTasksClient,
  ) {}

  getClient() {
    return this.client;
  }

  async createTask<PayloadType = any>(
    taskOptions: CreateTaskOptions<PayloadType> = { httpMethod: 'POST' },
  ) {
    const [response] = await this.createTaskInternal(taskOptions);
    return response.name;
  }

  async scheduleTask<PayloadType = any>(
    taskOptions: ScheduleTaskOptions<PayloadType>,
  ) {
    const [response] = await this.createTaskInternal(taskOptions);
    return response.name;
  }

  async listQueues() {
    throw new Error('Method not implemented.');
  }

  async deleteQueue() {
    throw new Error('Method not implemented.');
  }

  async createQueue() {
    throw new Error('Method not implemented.');
  }

  private createTaskInternal<PayloadType = any>(
    taskOptions: ScheduleTaskOptions<PayloadType>,
  ) {
    const { location, projectId, queue } = this.getQueueParams(
      this.config,
      taskOptions,
    );

    const parent = this.client.queuePath(projectId, location, queue);
    const task = this.buildTask<PayloadType>(taskOptions);

    return this.client.createTask({ parent, task });
  }

  private buildTask<PayloadType>(
    taskOptions: ScheduleTaskOptions<PayloadType>,
  ) {
    const task: protos.google.cloud.tasks.v2.ITask = {
      name: taskOptions.name,
      httpRequest: {
        headers: taskOptions.headers,
        oauthToken: taskOptions.oauthToken,
        oidcToken: taskOptions.oidcToken,
        httpMethod: taskOptions.httpMethod,
        url: taskOptions.url || this.config.url,
        body: taskOptions.payload
          ? Buffer.from(taskOptions.payload as any).toString('base64')
          : undefined,
      },
      scheduleTime: taskOptions.inSeconds
        ? { seconds: taskOptions.inSeconds + Date.now() / 1000 }
        : undefined,
    };

    return task;
  }

  private getQueueParams(
    config: CloudTasksConfig,
    taskWithQueueParams: QueueParams,
  ): QueueParams {
    const queueParams = {
      location: taskWithQueueParams.location || config.location,
      projectId: taskWithQueueParams.projectId || config.projectId,
      queue: taskWithQueueParams.queue || config.queue,
    };

    if (!queueParams.location || !queueParams.projectId || !queueParams.queue) {
      throw new CloudTasksError(
        'Queue params (location, projectId, queue) were not provided. Please provide them in the config or in the task.',
      );
    }

    return queueParams;
  }
}
