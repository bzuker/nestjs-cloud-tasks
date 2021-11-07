import { Inject } from '@nestjs/common';
import {
  CLOUD_TASKS_CLIENT,
  CLOUD_TASKS_CONFIG,
} from './cloud-tasks.constants';

/**
 * Injects the Cloud Tasks config
 */
export const InjectCloudTasksConfig = () => Inject(CLOUD_TASKS_CONFIG);

/**
 * Injects the Cloud Tasks config
 */
export const InjectCloudTasksClient = () => Inject(CLOUD_TASKS_CLIENT);
