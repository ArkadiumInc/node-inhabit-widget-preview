import { NgModule, ModuleWithProviders }  from '@angular/core';
import { HttpModule }                     from '@angular/http';

import { WidgetPreviewComponent }     from './widget-preview.component';
import { WidgetConfigurationService } from './widget-configuration.service';

@NgModule({
  imports: [ HttpModule ],
  declarations: [ WidgetPreviewComponent ],
  providers: [ WidgetConfigurationService ],
  exports: [ WidgetPreviewComponent ]
})
export class WidgetPreviewModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: WidgetPreviewModule };
  }
}