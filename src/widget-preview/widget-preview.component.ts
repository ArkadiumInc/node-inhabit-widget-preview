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
  @Input('env') env: string = ENVS.dev;
  @Input('widgetConfiguration') widget: WidgetConfiguration;
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

    if (!this.widget) {
      this.error.emit(this.widget);
      return;
    }

    this.configurationService.fetchConfiguration(this.env)
      .map(configuration => new ScriptElement({
        'data-ark-configuration': this.configurationService.build(configuration, this.widget),
        'data-ark-contextual-url': this.contextualUrl
      }, this.env))
      .do(script => script.appendTo(this.elementRef))
      .do(script => script.nativeElement.onload = (e: any) => this.ready.emit(e))
      .do(script => script.nativeElement.onerror = (e: any) => this.error.emit(e))
      .catch(error => Observable.of(this.error.emit(error)))
      .subscribe();
  }

  clean() {
    // Remove all child elements (scripts, ark-boxes)
    this.elementRef.nativeElement.innerHTML = '';
  }
}
