import { ModuleConfiguration } from './module-configuration.model';
import { Module } from './module.model';

export class WidgetConfiguration {
  id: string;
  configuration: any;
  modules: Array<any>;

  constructor() {
    this.configuration = [];
    this.modules = [];
  }

  /**
   * Return inserted object
   * @param moduleConfig
   * @returns {any}
   */
  public addModuleFromConfig(moduleConfig: ModuleConfiguration) {
    this.modules.push(moduleConfig);
    return moduleConfig;
  }

  /**
   * Return inserted object
   * @param moduleModel
   * @returns {any}
   */
  public addModuleFromModel(moduleModel: Module) {
    const config = ModuleConfiguration.fromModule(moduleModel);
    this.modules.push(config);
    return config;
  }

  /**
   * Remove by object reference
   * @param module
   */
  public removeModule(module: ModuleConfiguration) {
    let index = this.modules.indexOf(module);
    this.modules.splice(index, 1);
  }

}