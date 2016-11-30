import { Injectable } from '@angular/core';

import { WidgetPreviewConfig, ComponentConfig } from './widget-preview.config';
import { Module }                               from './widget-module';

const STORAGE_NAME = '__ark_app__';

declare var global: any;

@Injectable()
export class WidgetConfigurationService {
  private storage: any;

  constructor() {
    global[STORAGE_NAME] = global[STORAGE_NAME] || {};
    this.storage = global[STORAGE_NAME];
    this.storage.configurations = this.storage.configurations || {};
  }

  build(module: Module) {
    const id = this.simpleUUID(),
      config = new WidgetPreviewConfig();

    config.set('ModuleManager', new ComponentConfig('ModuleManager', {
      cdn: `https://inhabitmaind.blob.core.windows.net/modulerepository/${moduleConfig.id}/${moduleConfig.version}/inhabitcfg.json`
    }));

    config.set(new ComponentConfig('contentPresenter', [{
      id: 'inWidget',
      cfg: {
        modules: [ module.toConfig() ]
      }
    }]));

    this.storage.configurations[id] = config.toArray();
    return '__ark_app__:' + id;
  }

  public simpleUUID(): string {
    const bytes = 2, bits = 16;
    return [4, 2, 2, 2, 6].map(
      len => Array
        .from({length: len * bytes}, Math.random)
        .map(rnd => Math.ceil(rnd * bits).toString(bits))
        .join('')
    ).join('-');
  }
}
