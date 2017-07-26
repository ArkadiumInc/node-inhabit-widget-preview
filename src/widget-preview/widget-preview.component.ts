import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

import { ScriptElement }              from './script.element';
import { WidgetConfigurationService } from './widget-configuration.service';
import { WidgetConfiguration }        from './widget-configuration.model';

const ENVS = {dev: 'dev', qa: 'qa', live: 'live'};

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
      this.configurationService.processWidget(this.widget, this.env)
        .map(arkAppId => new ScriptElement({
          'data-ark-configuration': arkAppId,
          'data-ark-contextual-url': this.contextualUrl,
          'data-ark-log': this.debug
        }, this.env))
        .do(script => this.appendScript(script))
        .catch(error => Observable.of(this.error.emit(error)))
        .subscribe();
    }

    // By application id
    if (this.applicationId) {
      let script = new ScriptElement({
        'data-ark-client': this.applicationId,
        'data-ark-contextual-url': this.contextualUrl
      }, this.env);
      this.appendScript(script)
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
