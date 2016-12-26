import { NgModule, ModuleWithProviders } from '@angular/core';

import { WidgetPreviewComponent }     from './widget-preview.component';
import { WidgetConfigurationService } from './widget-configuration.service';
import { WidgetConfiguration } from './widget-configuration.model';

@NgModule({
    declarations: [ WidgetPreviewComponent ],
    providers: [ WidgetConfigurationService, WidgetConfiguration ],
    exports: [ WidgetPreviewComponent ]
})
export class WidgetPreviewModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: WidgetPreviewModule };
    }
}