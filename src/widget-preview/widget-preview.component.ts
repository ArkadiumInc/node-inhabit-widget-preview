import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { Module }                     from './widget-module';
import { ScriptElement }              from './script.element';
import { WidgetConfigurationService } from './widget-configuration.service';

@Component({
  selector: 'inhabit-widget-preview',
  template: ''
})
export class WidgetPreviewComponent {
  @Input('module') module: Module;
  @Input('contextualUrl') contextualUrl: string;
  @Output('ready') ready: EventEmitter<any> = new EventEmitter();
  @Output('error') error: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef
    , private configuration: WidgetConfigurationService) {
  }

  render() {
    this.clean();

    if (!this.module) {
      this.error.emit(this.module);
      return;
    }

    const script = new ScriptElement({
      'data-ark-configuration': this.configuration.build(this.module),
      'data-ark-contextual-url': this.contextualUrl
    });

    script.appendTo(this.elementRef);
    script.nativeElement.onload = e => this.ready.emit(e);
    script.nativeElement.onerror = e => this.error.emit(e);
  }

  clean() {
    // Remove all child elements (scripts, ark-boxes)
    this.elementRef.nativeElement.innerHTML = '';
  }
}
