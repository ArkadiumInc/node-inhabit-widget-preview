import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { WidgetConfiguration } from './widget-configuration.model';

const STORAGE_NAME = '__ark_app__';

const CONFIG_SOURCES = {
  live: '//inhabit-widget-service.azurewebsites.net/Widget/v1/Settings?client=preview',
  dev: '//inhabit-widget-service-dev.azurewebsites.net/Widget/v1/Settings?client=preview',
};

const clone = (value: any) => JSON.parse(JSON.stringify(value));

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

  buildConfig(widget: WidgetConfiguration, environment: string): Observable<any> {
    // Widget already has config, just export it
    if (widget.configuration && widget.configuration.length) {
      return of(widget.configuration);
    }

    // Widget contain only modules, so fetch config, then combine it with modules and export
    if (widget.modules && widget.modules.length) {
      return this.fetchConfiguration(environment)
        .pipe(map(config => this.fillConfigWithModules(clone(config), widget)));
    } else {
      return throwError('Nor valid configuration, nor valid modules were provided');
    }
  }

  exportConfigGetAppId(configuration: any): string {
    const id = this.simpleUUID();
    // Clone configuration, to prevent mutation
    this.storage.configurations[id] = clone(configuration);
    return '__ark_app__:' + id;
  }

  private fetchConfiguration(environment: string): Observable<any> {
    if (this.configurationsCache[environment]) {
      return of(this.configurationsCache[environment]);
    }
    let url = CONFIG_SOURCES[environment];

    return this.http.get(url)
      .pipe(
        tap(config => this.configurationsCache[environment] = config),
        catchError(error => throwError(error.json() && error.json().Message || 'Server error'))
      );
  }

  private fillConfigWithModules(config: any, widget: WidgetConfiguration): any {
    // Get reference of modules array in config and fill it from widget
    let modulesRef = WidgetConfiguration.getModulesFromConfiguration(config);

    modulesRef.length = 0;
    Array.prototype.push.apply(modulesRef, widget.modules);

    return config;
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
