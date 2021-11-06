import { Inject } from '@nestjs/common';
import {
  CLOUD_TASKS_CLIENT_TOKEN,
  CLOUD_TASKS_CONFIG_TOKEN,
} from './cloud-tasks.constants';

/**
 * Injects the Cloud Tasks config
 */
export const InjectCloudTasksConfig = () => Inject(CLOUD_TASKS_CONFIG_TOKEN);

/**
 * Injects the Cloud Tasks config
 */
export const InjectCloudTasksClient = () => Inject(CLOUD_TASKS_CLIENT_TOKEN);
