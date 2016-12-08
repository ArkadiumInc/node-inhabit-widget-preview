export class Module {

  moduleId: string;
  title: string;
  description: string;
  imageUrl: string;
  badges: Array<string>;
  developerGroupId: string;
  categories: Array<string>;
  uniqueVersionsCount: string;
  version: string;
  status: number;
  jsonSchema: {
    form: any,
    options: any,
    schema: {
      properties: any,
      type: string
    }
  };
  defaultConfiguration: any;
  exampleContextualUrl: string;
  isReleased: boolean;
  releaseDate: any;
  testReport: any;
  uploadDate: any;

  constructor() {
  }

  deserialize(moduleData : Module) {
    this.moduleId = moduleData.moduleId;
    this.title = moduleData.title;
    this.description = moduleData.description;
    this.imageUrl = moduleData.imageUrl;
    this.badges = moduleData.badges;
    this.developerGroupId = moduleData.developerGroupId;
    this.categories = moduleData.categories;
    this.uniqueVersionsCount = moduleData.uniqueVersionsCount;
    this.version = moduleData.version;
    this.status = moduleData.status;
    this.jsonSchema = moduleData.jsonSchema;
    this.defaultConfiguration = moduleData.defaultConfiguration;
    this.exampleContextualUrl = moduleData.exampleContextualUrl;
    this.isReleased = moduleData.isReleased;
    this.releaseDate = moduleData.releaseDate;
    this.testReport = moduleData.testReport;
    this.uploadDate = moduleData.uploadDate;
  }

}
