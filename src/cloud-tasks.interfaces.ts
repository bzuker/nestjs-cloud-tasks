import { protos } from '@google-cloud/tasks';
import { ClientOptions } from 'google-gax';

export interface CloudTasks {}

export interface CloudTasksConfig extends ClientOptions, QueueParams {
  url?: string;
  serviceAccountEmail?: string;
}

export interface QueueParams {
  projectId?: string;
  location?: string;
  queue?: string;
}

export type CreateTaskOptions<PayloadType> = QueueParams & {
  name?: string;
  httpMethod?:
    | protos.google.cloud.tasks.v2.HttpMethod
    | keyof typeof protos.google.cloud.tasks.v2.HttpMethod;
  headers?: { [k: string]: string };
  oauthToken?: protos.google.cloud.tasks.v2.IOAuthToken;
  oidcToken?: protos.google.cloud.tasks.v2.IOidcToken;
  url?: string;
  serviceAccountEmail?: string;
  payload?: PayloadType;
};

export type ScheduleTaskOptions<PayloadType> =
  CreateTaskOptions<PayloadType> & {
    inSeconds?: number;
  };
