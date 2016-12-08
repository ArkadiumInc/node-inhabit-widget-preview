import { Module } from './module.model';

export class ModuleConfiguration {

  id: string;
  v: string;

  constructor() {
  }

  public static fromModule(moduleModel: Module) {
    const moduleConfiguration = new ModuleConfiguration();

    moduleConfiguration.id = moduleModel.moduleId;
    moduleConfiguration.v = moduleModel.version;
    Object.assign(moduleConfiguration, moduleModel.defaultConfiguration);

    return moduleConfiguration;
  }
}
