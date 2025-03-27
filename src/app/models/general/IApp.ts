import { TypeModeApp } from '../../common/enums/general/TypeModeApp';
import { TypeModule } from '../../common/enums/general/TypeModule';

export interface IApp {
  appName: string;
  typeModule: TypeModule;
  moduleName: string;
  version: string;
  mode?: TypeModeApp;
  paginationSmall: number[];
  paginationLarge: number[];
}
