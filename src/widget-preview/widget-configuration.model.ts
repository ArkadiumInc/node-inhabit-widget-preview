import { EventEmitter } from '@angular/core';

import { jsonConfigExample } from './jsonConfigExample';
import { ModuleConfiguration } from './module-configuration.model';
import { Module } from './module.model';

export class WidgetConfiguration {
  id: string;
  configuration;
  modules: Array<any>;

  onChange: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.configuration = JSON.parse(jsonConfigExample);
    this.modules = this.configuration
      .find(component => component.id === 'contentPresenter')
      .cfg.find(subComponent=> subComponent.id === 'inWidget').cfg.modules;
  }

  /**
   * Return inserted object
   * @param moduleConfig
   * @returns {any}
   */
  public addModuleFromConfig(moduleConfig: ModuleConfiguration) {
    this.modules.push(moduleConfig);
    this.emitChanges();
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
    this.emitChanges();
    return config;
  }

  /**
   * Remove by object reference
   * @param module
   */
  public removeModule(module: ModuleConfiguration) {
    let index = this.modules.indexOf(module);
    this.modules.splice(index, 1);
    this.emitChanges();
  }

  public emitChanges() {
    this.onChange.emit();
  }
  
}