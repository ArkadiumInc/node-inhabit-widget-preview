import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {
    global[STORAGE_NAME] = global[STORAGE_NAME] || {};
    this.storage = global[STORAGE_NAME];
    this.storage.configurations = this.storage.configurations || {};
  }

  exportWidgetConfig(widget: WidgetConfiguration, environment: string): Observable<string> {
    if (widget.configuration && widget.configuration.length) {
      // Widget already has config, just export it
      return of(this.exportConfig(widget.configuration));
    } else if (widget.modules && widget.modules.length) {
      // Widget contain only modules, so fetch config, then combine it with modules and export
      return this.fetchConfiguration(environment)
        .pipe(map(configuration => {
          // Get reference of modules array in config and fill it from widget
          let modulesRef = WidgetConfiguration.getModulesFromConfiguration(configuration);

          modulesRef.length = 0;
          Array.prototype.push.apply(modulesRef, widget.modules);

          return this.exportConfig(configuration);
        }));
    } else {
      return throwError('Nor valid configuration, nor valid modules were provided');
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
      return of(this.configurationsCache[environment]);
    }
    let url = CONFIG_SOURCES[environment];

    return this.http.get(url)
      .pipe(
        map(res => this.configurationsCache[environment] = res),
        catchError(error => throwError(error.json() && error.json().Message || 'Server error'))
      );
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
