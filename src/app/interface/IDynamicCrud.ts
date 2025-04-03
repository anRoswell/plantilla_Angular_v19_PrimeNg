import { DatePicker } from 'primeng/datepicker';

export interface FormField {
  type:
    | 'input'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'dropdown'
    | 'calendar'
    | 'inputNumber'
    | 'multiselect'
    | 'inputSwitch'
    | 'lupas';
  name: string; // nombre del campo
  label: string; // etiqueta para mostrar
  value?: any; // valor predeterminado
  required?: boolean; // si es requerido
  options?: any[]; // opciones para selects
  validators?: any[]; // validadores a aplicar
  errorMessage?: string; // mensaje de error
  placeholder?: string; // placeholder para el campo
  gridClass?: string; // clase para el grid (p-col-12 p-md-6, etc)
  inputType?: string; // tipo de input (text, number, email, etc)
  acceptedTypes?: string; // Ej: 'image/*,.pdf'
  multiple?: boolean;
  preview?: boolean; // Para mostrar preview de imágenes
  maxFileSize?: number;
  customUpload?: boolean;
  disabled?: boolean;
  autoUpload?: boolean;
  minDate?: DatePicker['minDate'];
  maxDate?: DatePicker['maxDate'];
  dateFormat?: DatePicker['dateFormat'];
  selectionMode?: DatePicker['selectionMode'];
  showButtonBar?: DatePicker['showButtonBar'];
  searchFields?: any[];
  icon?: string;
  dropdownIcon?: string;
  minLength?: number;
  delay?: number;
  suggestionsLimit?: number;
  emptyMessage?: string;
  loadingMessage?: string;
  autoHighlight?: boolean;
  forceSelection?: boolean;
}

export interface FormGroupConfig {
  [key: string]: [any, any[]];
}

export interface FormConfig {
  fields: FormField[];
  title?: string;
  submitLabel?: string;
}

export interface FormConfig {
  fields: FormField[];
  title?: string;
  submitLabel?: string;
}

export interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

export interface CiudadOption {
  key: number;
  value: string;
}
