import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { WidgetConfiguration } from './widget-configuration.model';

const STORAGE_NAME = '__ark_app__';

const CONFIG_SOURCES = {
  live: '//inhabit-widget-service.azurewebsites.net/Widget/v1/Settings?client=preview',
  dev: '//inhabit-widget-service-dev.azurewebsites.net/Widget/v1/Settings?client=preview',
};

declare var global: any;

@Injectable()
export class WidgetConfigurationService {
  private storage: any;
  private configurationsCache: any = {};

  constructor(private http: Http) {
    global[STORAGE_NAME] = global[STORAGE_NAME] || {};
    this.storage = global[STORAGE_NAME];
    this.storage.configurations = this.storage.configurations || {};
  }

  exportWidgetConfig(widget: WidgetConfiguration, environment: string): Observable<string> {
    if (widget.configuration && widget.configuration.length) {
      // Widget already has config, just export it
      return Observable.of(this.exportConfig(widget.configuration));
    } else if (widget.modules && widget.modules.length) {
      // Widget contain only modules, so fetch config, then combine it with modules and export
      return this.fetchConfiguration(environment)
        .map(configuration => {
          // Get reference of modules array in config and fill it from widget
          let modulesRef = WidgetConfiguration.getModulesFromConfiguration(configuration);

          modulesRef.length = 0;
          Array.prototype.push.apply(modulesRef, widget.modules);

          return this.exportConfig(configuration);
        });
    } else {
      return Observable.throw('Nor valid configuration, nor valid modules were provided');
    }
  }

  exportConfig(configuration: any) {
    const id = this.simpleUUID();
    // Clone configuration, to prevent mutation
    this.storage.configurations[id] = JSON.parse(JSON.stringify(configuration));
    return '__ark_app__:' + id;
  }

  public fetchConfiguration(environment: string): Observable<any> {
    if (this.configurationsCache[environment]) {
      return Observable.of(this.configurationsCache[environment]);
    }
    let url = CONFIG_SOURCES[environment];

    return this.http.get(url)
      .map((response: Response) => {
        return this.configurationsCache[environment] = response.json();
      })
      .catch(error => Observable.throw(error.json() && error.json().Message || 'Server error'));
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
