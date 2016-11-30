const DEFAULTS =
    [
      {
        "id": "ModuleManager",
        "cfg": {
          "cdn": "//inhabitmaindev.akamaized.net/modulerepository"
        }
      },
      {
        "id": "application",
        "cfg": {
          "cssUrl": [ "//inhabit-widget-features.azurewebsites.net/css/ark-app.css" ],
          "cacheTimeSec": "300",
          "cdnUrl": ""
        }
      },
      {
        "id": "textClassificationService",
        "cfg": {
          "providers": [
            {
              "id": "alchemy",
              "url": "//semantic-inhabit.as.arkadiumhosted.com/api/alchemy",
              "prefetchMethods": []
            }
          ]
        }
      },
      {
        "id": "widget",
        "cfg": [
          {
            "id": "widget",
            "cfg": {
              "title": "test",
              "logoVisibility": "collapse",
              "headerVisibility": false,
              "presenter": "contentPresenter",
              "rulesGroup": "inWidget"
            }
          }
        ]
      },
      {
        "id": "contentPresenter",
        "cfg": [
          {
            "id": "inWidget",
            "cfg": {
              "modules": []
            }
          }
        ]
      }
    ];

export class WidgetPreviewConfig {
  private map: Map<string, any>;

  constructor(config: ComponentConfig[] = []) {
    this.map = new Map();
    DEFAULTS.forEach(elem => this.set(new ComponentConfig(elem.id, elem.cfg)));
    config.forEach(elem => this.set(new ComponentConfig(elem.id, elem.cfg)));
  }

  public set(elem: ComponentConfig) {
    return this.map.set(elem.id, elem.cfg);
  }

  public get(id) {
    return this.map.get(id) && { id, cfg: this.map.get(id) };
  }

  public toArray(): Array<any> {
    const array = [];
    this.map.forEach((value, key) => array.push(this.get(key)));
    return array;
  }
}

export class ComponentConfig {
  public cfg: any;
  constructor( public id: string, cfg: any ) {
    this.cfg = JSON.parse(JSON.stringify(cfg));
  }
}
