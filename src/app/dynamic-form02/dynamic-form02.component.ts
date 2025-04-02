// dynamic-form.model.ts

// dynamic-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { MessagesModule } from 'primeng/messages';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { ToastMessageOptions } from 'primeng/api';
import { SelectModule } from 'primeng/select';

// Pipe
import { FileSizePipe } from '../pipe/FileSize.pipe.js';

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
    | 'inputSwitch';
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
}

interface FormGroupConfig {
  [key: string]: [any, any[]];
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

@Component({
  selector: 'app-dynamic-form02',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    MultiSelectModule,
    InputNumberModule,
    DatePickerModule,
    ToastModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    CheckboxModule,
    RadioButtonModule,
    DatePickerModule,
    FluidModule,
    MessagesModule,
    FileUpload,
    NgClass,
    FileSizePipe,
  ],
  templateUrl: './dynamic-form02.component.html',
  styleUrl: './dynamic-form02.component.scss',
})
export class DynamicForm02Component implements OnInit {
  @Input()
  config!: FormConfig;
  @Input() formData: any = {};
  @Output() formSubmit = new EventEmitter<any>();

  date1: Date | undefined;
  messages!: ToastMessageOptions[];

  // Upload
  uploadedFiles: { [key: string]: any[] } = {};

  form: FormGroup;
  fields: FormField[] = [];

  public response: string = '';

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    console.log(this.formData);
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((data) => {
        this.response = JSON.stringify(data);
        this.initForm();
      });

    //#region
  }

  ngOnChanges(): void {
    if (this.form) {
      this.updateFormData();
    }
  }

  private initForm(): void {
    if (!this.config) return;

    this.fields = this.config.fields;
    const formGroup: FormGroupConfig = {};

    this.fields.forEach((field) => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.validators) {
        validators.push(...field.validators);
      }

      // Asignar clase de grid por defecto si no tiene
      if (!field.gridClass) {
        field.gridClass = 'p-col-12 p-md-6';
      }

      // Si hay datos iniciales para edición, los usamos
      const initialValue =
        this.formData[field.name] !== undefined
          ? this.formData[field.name]
          : field.value !== undefined
          ? field.value
          : '';

      formGroup[field.name] = [initialValue, validators];
    });

    this.form = this.fb.group(formGroup);
  }

  private updateFormData(): void {
    if (!this.formData) return;

    Object.keys(this.formData).forEach((key) => {
      if (this.form.controls[key]) {
        this.form.controls[key].setValue(this.formData[key]);
      }
    });
  }

  onSubmit(): void {
    console.log(this.form.value);

    if (this.form.valid) {
      // Aquí puedes procesar los archivos junto con los demás datos
      const formData = new FormData();
      const formValue = this.form.value;

      // Agregar campos normales
      Object.keys(formValue).forEach((key) => {
        if (key !== 'archivos') {
          // Ajusta según el nombre de tu campo de archivos
          formData.append(key, formValue[key]);
        }
      });

      // Agregar archivos
      Object.keys(this.uploadedFiles).forEach((fieldName) => {
        if (this.uploadedFiles[fieldName]) {
          this.uploadedFiles[fieldName].forEach((file) => {
            formData.append(fieldName, file);
          });
        }
      });

      // Emitir el formulario (ahora incluye los archivos)
      this.formSubmit.emit(formData);

      this.messages = [
        {
          severity: 'success',
          summary: 'Éxito',
          detail: 'Formulario enviado correctamente',
        },
      ];
    } else {
      this.markFormGroupTouched(this.form);
      this.messages = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, revise los campos marcados en rojo',
        },
      ];
    }
  }

  // Función auxiliar para marcar todos los campos como tocados
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Verificar si un campo tiene errores
  hasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  // Obtener el mensaje de error para un campo
  getErrorMessage(field: FormField): string {
    const control = this.form.get(field.name);
    if (control) {
      if (control.hasError('required')) {
        return `${field.label} es requerido`;
      }

      if (control.hasError('email')) {
        return `Ingrese un correo electrónico válido`;
      }

      if (control.hasError('minlength')) {
        const minLengthError = control.errors?.['minlength'];
        return minLengthError
          ? `Debe tener al menos ${minLengthError.requiredLength} caracteres`
          : '';
      }

      if (control.hasError('maxlength')) {
        const maxLengthError = control.errors?.['maxlength'];
        return maxLengthError
          ? `No debe exceder ${maxLengthError.requiredLength} caracteres`
          : '';
      }

      return field.errorMessage || 'Este campo tiene un error';
    }
    return '';
  }

  //#region UPLOAD FILE

  onFileUpload(event: any, fieldName: string) {
    console.log('Se activo en OnFileUload');
    // Inicializar array si no existe
    if (!this.uploadedFiles[fieldName]) {
      this.uploadedFiles[fieldName] = [];
    }

    // Limpiar archivos previos si no es múltiple
    const fieldConfig = this.config.fields.find((f) => f.name === fieldName);
    if (!fieldConfig?.multiple) {
      this.uploadedFiles[fieldName] = [];
    }

    // Agregar nuevos archivos (sin subirlos al servidor)
    for (let file of event.files) {
      this.uploadedFiles[fieldName].push(file);
    }

    // Actualizar el control del formulario con los archivos
    this.form
      .get(fieldName)
      ?.setValue(
        fieldConfig?.multiple
          ? this.uploadedFiles[fieldName]
          : this.uploadedFiles[fieldName][0]
      );

    // Notificar al usuario
    this.messages = [
      {
        severity: 'success',
        summary: 'Archivos listos',
        detail: `Se agregaron ${event.files.length} archivo(s) al formulario`,
      },
    ];

    // Simular éxito de carga (requerido por PrimeNG)
    // Reemplaza event.options.clear() con:
    if (event?.clear) {
      event.clear(); // Forma correcta de limpiar los archivos seleccionados
    }
  }

  removeFile(fieldName: string, index: number) {
    if (this.uploadedFiles[fieldName]?.length > index) {
      this.uploadedFiles[fieldName].splice(index, 1);
      this.form
        .get(fieldName)
        ?.setValue(
          this.config.fields.find((f) => f.name === fieldName)?.multiple
            ? this.uploadedFiles[fieldName]
            : this.uploadedFiles[fieldName][0] || null
        );
    }
  }

  isImage(file: any): boolean {
    return file?.type?.startsWith('image/');
  }

  getPreviewUrl(file: any): string {
    return file.objectURL || URL.createObjectURL(file);
  }

  getFileIcon(file: any): string {
    const extension = file.name?.split('.').pop()?.toLowerCase() || '';
    const fileType = file.type || '';

    // Iconos para tipos conocidos
    if (fileType.includes('image/')) return 'pi pi-image';
    if (fileType.includes('pdf')) return 'pi pi-file-pdf';
    if (fileType.includes('msword') || fileType.includes('wordprocessingml'))
      return 'pi pi-file-word';
    if (fileType.includes('excel') || fileType.includes('spreadsheetml'))
      return 'pi pi-file-excel';
    if (fileType.includes('powerpoint') || fileType.includes('presentationml'))
      return 'pi pi-file-powerpoint';
    if (fileType.includes('zip') || fileType.includes('compressed'))
      return 'pi pi-file-archive';

    // Por extensión si el tipo no está disponible
    switch (extension) {
      case 'pdf':
        return 'pi pi-file-pdf text-red-500';
      case 'doc':
      case 'docx':
        return 'pi pi-file-word text-blue-500';
      case 'xls':
      case 'xlsx':
        return 'pi pi-file-excel text-green-500';
      case 'ppt':
      case 'pptx':
        return 'pi pi-file-powerpoint text-orange-500';
      case 'txt':
        return 'pi pi-file text-gray-500';
      case 'csv':
        return 'pi pi-file text-teal-500';
      case 'zip':
      case 'rar':
      case '7z':
        return 'pi pi-file-archive text-purple-500';
      default:
        return 'pi pi-file text-gray-400';
    }
  }
  //endregion
}
