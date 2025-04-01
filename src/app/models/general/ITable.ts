import { TypeSelectionModeTable } from '../../common/enums/general/TypeSelectionModeTable';
import { TypeSeverity } from './IModal';

export interface ITable {
  columns: IColumn[];
  fieldId: string;
  paginator: boolean;
  isDataLocal?: boolean;
  rowsPerPageOptions?: number[];
  lazyLoadOnInit?: boolean;
}

export interface IColumn {
  label: string;
  field?: string; // field para el caso de los botones sirve para controlar la activación si el campo es null
  width?: number;
  type?: TypeColumn;
  filter?: boolean;
  sort?: boolean;
  action?: (data: any, bnt: any) => void;
  icon?: string;
  format?: TypeFormat;
  order?: number;
  fieldColorTag?: string; // campo de la tabla que proporciona el color
  buttonColor?: TypeSeverity; // color del boton
  buttonText?: boolean; // determina si el boton se muestra como solo texto
}

export enum TypeColumn {
  STRING = 'text',
  NUMBER = 'numeric',
  DATE = 'date',
  ACTION = 'action',
  HIDDEN = 'hidden',
  TAG = 'tag',
  TRUNCATE_TEXT = 'truncate',
  MULTI_SELECT = TypeSelectionModeTable.MULTIPLE,
  SINGLE_SELECT = TypeSelectionModeTable.SINGLE,
}

export enum TypeFormat {
  LOWERCASE = 'lowercase',
  UPPERCASE = 'uppercase',
  CAPITALIZE = 'capitalize',
  DATE = 'date',
  DATETIME = 'datetime',
  TRUNCATE_TEXT = 'truncate',
  TIME = 'time',
  TIME_HMS = 'time_hms',
}
