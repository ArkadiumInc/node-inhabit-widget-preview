import { ModuleConfiguration } from './module-configuration.model';
import { Module } from './module.model';

export class WidgetConfiguration {
  id: string;
  configuration: Array<any>;
  modules: Array<any> = [];

  public setConfiguration(configuration: any) {
    // Ensure that incoming configuration is valid
    WidgetConfiguration.getModulesFromConfiguration(configuration)
      .forEach(module => this.addModuleFromConfig(module));
    this.configuration = configuration;
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

  static getModulesFromConfiguration(configuration: any): Array<any> {
    try {
      let componentConfig = configuration.find((component: {id: string, cfg: any}) => component.id === 'contentPresenter');

      let layoutConfig = componentConfig.cfg.find((layout: {id: string, cfg: any}) => layout.id === 'inWidget');

      return layoutConfig.cfg['modules'];
    }
    catch (err) {
      throw Error(['Provided configuration is not valid', err.message].join());
    }
  }

}