import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ScriptElement }              from './script.element';
import { WidgetConfigurationService } from './widget-configuration.service';
import { WidgetConfiguration }        from './widget-configuration.model';

const ENVS = { dev: 'dev', qa: 'qa', live: 'live' };

@Component({
  selector: 'inhabit-widget-preview',
  template: ''
})
export class WidgetPreviewComponent {
  @Input('env') env: string = ENVS.live;
  @Input('debug') debug: boolean = false;
  @Input('widgetConfiguration') widget: WidgetConfiguration;
  @Input('applicationId') applicationId: string;
  @Input('contextualUrl') contextualUrl: string;
  @Output('ready') ready: EventEmitter<any> = new EventEmitter();
  @Output('error') error: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef, private configurationService: WidgetConfigurationService) {
  }

  render() {
    this.clean();

    if (!ENVS[this.env]) {
      this.error.emit(`Given environment "${this.env}" is not allowed`);
      return;
    }

    if (!this.widget && !this.applicationId) {
      this.error.emit('No widget configuration or application id was provided');
      return;
    }

    // By widget (configuration | modules)
    if (this.widget) {
      this.configurationService.buildConfig(this.widget, this.env)
        .pipe(
          map(config => this.configurationService.exportConfigGetAppId(config)),
          map(appId => new ScriptElement(appId, this.contextualUrl, this.debug, this.env)),
          tap(script => this.appendScript(script)),
          catchError(error => of(this.error.emit(error)))
        )
        .subscribe();
      return;
    }

    // By application id
    if (this.applicationId) {
      let script = new ScriptElement(this.applicationId, this.contextualUrl, this.debug, this.env);
      this.appendScript(script);
    }
  }

  private appendScript(script: any) {
    script.appendTo(this.elementRef);
    script.nativeElement.onload = (e: any) => this.ready.emit(e);
    script.nativeElement.onerror = (e: any) => this.error.emit(e);
  }

  clean() {
    // Remove all child elements (scripts, ark-boxes)
    this.elementRef.nativeElement.innerHTML = '';
  }
}
