import { Component, ElementRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ScriptElement }              from './script.element';
import { WidgetConfigurationService } from './widget-configuration.service';
import { WidgetConfiguration }        from './widget-configuration.model';

@Component({
  selector: 'inhabit-widget-preview',
  template: ''
})
export class WidgetPreviewComponent {
  @Input('widgetConfiguration') widget: WidgetConfiguration;
  @Input('contextualUrl') contextualUrl: string;
  @Output('ready') ready: EventEmitter<any> = new EventEmitter();
  @Output('error') error: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef, private configurationService: WidgetConfigurationService) {
  }

  ngOnChanges() {
    // Subscribe on widget changes
    this.widget.onChange.subscribe(() => this.render());
    this.render();
  }

  private render() {
    this.clean();

    if (!this.widget) {
      this.error.emit(this.widget);
      return;
    }

    const script = new ScriptElement({
      'data-ark-configuration': this.configurationService.build(this.widget),
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
