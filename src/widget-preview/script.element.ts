import { ElementRef } from '@angular/core';

const SCRIPT_SOURCES = {
    live: '//inhabit-widget-service.azurewebsites.net/Widget/v1/',
    dev: '//inhabit-widget-service-dev.azurewebsites.net/Widget/v1/'
};

const ELEMENT_NAME = 'script',
    DEFAULT_ATTRS = {
        async: 'TRUE',
        type: 'text/javascript',
        src: SCRIPT_SOURCES.dev
    };

export class ScriptElement {
    public nativeElement: any;
    private attributes: Map<any, any> = new Map();

    constructor(attributes: any, environment?: string) {
        if (environment) {
            attributes.src = SCRIPT_SOURCES[environment];
        }
        this.setAttributes(DEFAULT_ATTRS);
        this.setAttributes(attributes);
    }

    public setAttributes(obj: Object): ScriptElement {
        Object.keys(obj).forEach(key => {
            this.attributes.set(key, obj[key]);
        });
        return this;
    }

    public appendTo(element: ElementRef) {
        this.nativeElement = document.createElement(ELEMENT_NAME);
        this.attributes.forEach((value, key) => {
            this.nativeElement.setAttribute(key, value);
        });
        element.nativeElement.appendChild(this.nativeElement);
    }
}
