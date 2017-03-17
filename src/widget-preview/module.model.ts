export class Module {

  moduleId: string;
  title: string;
  description: string;
  imageUrl: string;
  badges: Array<string>;
  developerGroupId: string;
  categories: Array<string>;
  changeLog: Array<{
    action: string;
    actor: string;
    timeStamp: any
  }>;
  uniqueVersionsCount: string;
  version: string;
  status: string;
  reviews: Array<{
    administratorId: string,
    administratorName: string,
    administratorRole: string,
    status: string,
    message: string,
    reportUrl: string
  }>;
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
    this.badges = moduleData.badges || [];
    this.developerGroupId = moduleData.developerGroupId;
    this.categories = moduleData.categories || [];
    this.changeLog = moduleData.changeLog || [];
    this.uniqueVersionsCount = moduleData.uniqueVersionsCount;
    this.version = moduleData.version;
    this.status = moduleData.status;
    this.reviews = moduleData.reviews || [];
    this.jsonSchema = moduleData.jsonSchema;
    this.defaultConfiguration = moduleData.defaultConfiguration;
    this.exampleContextualUrl = moduleData.exampleContextualUrl;
    this.isReleased = moduleData.isReleased;
    this.releaseDate = moduleData.releaseDate;
    this.testReport = moduleData.testReport;
    this.uploadDate = moduleData.uploadDate;
  }

}
