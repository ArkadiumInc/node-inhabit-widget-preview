export class Module {

  static STATUS_UNKNOWN     = 0;
  static STATUS_UPLOADED    = 1;
  static STATUS_TESTING     = 2;
  static STATUS_TEST_PASSED = 3;
  static STATUS_TEST_FAILED = 4;
  static STATUS_APPROVED    = 5;
  static STATUS_REJECTED    = 6;

  title       = '';
  description = '';
  imageUrl    = '';
  version     = '';
  config      = {};
  status      =  0;
  categories  = [];
  exampleContextualUrl = '';

  constructor(
    public name: string,
    public zip: any = '',
    public uploaded = false
  ) {}

  public stringifyConfig() {
    return JSON.stringify(this.config, null, 2);
  }

  public toFormData(): FormData {
    let form = new FormData();
    form.append('moduleId', this.name);
    form.append('uploadFile', this.zip);
    form.append('version', (1 + Math.random()));

    return form;
  }

  public toConfig(): any {
    let config = JSON.parse(JSON.stringify(this.config));
    config.id = this.name;
    config.v = this.version;
    return config;
  }

  public static fromData( { moduleId
                          , title
                          , description
                          , imageUrl
                          , version
                          , status
                          , defaultConfiguration
                          , exampleContextualUrl
                          , categories
                          } ) {
    const module = new Module(moduleId);

    module.title       = title;
    module.description = description;
    module.imageUrl    = imageUrl;
    module.version     = version;
    module.status      = status;
    module.config      = defaultConfiguration;
    module.categories  = categories;
    module.exampleContextualUrl = exampleContextualUrl;

    return module;
  }
}
