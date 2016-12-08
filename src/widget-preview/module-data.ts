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

}
