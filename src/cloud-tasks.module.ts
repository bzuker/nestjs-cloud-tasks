import { DynamicModule, Module } from '@nestjs/common';
import { CloudTasksConfig } from './cloud-tasks.interfaces';
import { CloudTasksCoreModule } from './cloud-tasks-core.module';
import { AsyncModuleConfig } from '@golevelup/nestjs-modules';

@Module({})
export class CloudTasksModule {
  static forRoot(config?: CloudTasksConfig): DynamicModule {
    return CloudTasksCoreModule.forRoot(CloudTasksCoreModule, config || {});
  }

  static forRootAsync(
    config?: AsyncModuleConfig<CloudTasksConfig>,
  ): DynamicModule {
    return CloudTasksCoreModule.forRootAsync(CloudTasksCoreModule, config);
  }
}
