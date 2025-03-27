import { TypeCalendar } from '../../common/enums/general/TypeCalendar';
import { TypeControl } from '../../common/enums/general/TypeControl';

export interface IInboxFilter {
  name: string; // general
  typeControl: TypeControl; // general
  label?: string; // general
  placeholder?: string; // general
  required: boolean; // general
  value?: any; // input, hidden, calendar
  optionLabel?: string; // dropdow y multiselect
  optionValue?: string; // dropdow y multiselect
  list?: any[]; // dropdow y multiselect
  selectedlist?: any[]; // dropdow y multiselect
  selectFirstItem?: boolean; // dropdow y multiselect
  addItemAll?: any; // dropdow y multiselect
  addItemWithout?: any; // dropdow y multiselect
  actionChangeTo?: string | string[]; // dropdown y multiselect (nombre del control destino que se hará el filtro)
  actionChangeToField?: string | string[]; // dropdown y multiselect (nombre del campo en el control destino que servirá de filtro)
  actionChangeToOptionFilter?: string | (string | null)[]; // dropdown y multiselect (opcional: nombre del campo en el control origen para el filtro, por defecto es optionValue)
  minDate?: Date; // calendar
  maxDate?: Date; // calendar
  typeCalendar?: TypeCalendar; // calendar
}
