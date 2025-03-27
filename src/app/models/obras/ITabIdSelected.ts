import { TypeTabReformado } from "src/app/common/enums/obras/TypeTabReformado";


export interface ITabIdSelected {
  id: number;
  tab: TypeTabReformado;
  isUpdated: Boolean;
}
