import { NgModule } from '@angular/core';

import { WidgetPreviewComponent }     from './widget-preview.component';
import { WidgetConfigurationService } from './widget-configuration.service';

@NgModule({
    declarations: [ WidgetPreviewComponent ],
    providers: [ WidgetConfigurationService ],
    exports: [ WidgetPreviewComponent ]
})
export class WidgetPreviewModule {}


