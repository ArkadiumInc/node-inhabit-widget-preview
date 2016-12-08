import { Injectable } from '@angular/core';

import { WidgetConfiguration } from './widget-configuration.model';

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

  build(widget: WidgetConfiguration) {
    const id = this.simpleUUID();
    this.storage.configurations[id] = JSON.parse(JSON.stringify(widget.configuration));
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
