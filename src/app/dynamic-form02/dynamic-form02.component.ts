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
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { MessageModule } from 'primeng/message';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { ToastMessageOptions } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';

// Pipe
import { FileSizePipe } from '../pipe/FileSize.pipe.js';
import {
  CiudadOption,
  FormConfig,
  FormField,
  FormGroupConfig,
} from '../interface/IDynamicCrud.js';
import { CiudadesService } from '../Services/ciudades.service.js';

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
    MessageModule,
    FileUpload,
    NgClass,
    FileSizePipe,
    AutoCompleteModule,
  ],
  providers: [CiudadesService],
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

  // Autocomplete
  selectedUbicacion: any;

  form: FormGroup;
  fields: FormField[] = [];

  public response: string = '';
  public itemsAutocomplete!: any[];

  constructor(
    private fb: FormBuilder,
    private ciudadesService: CiudadesService
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    console.log(this.formData);

    this.initForm();

    // this.httpClient
    //   .get('https://jsonplaceholder.typicode.com/todos/1')
    //   .subscribe((data) => {
    //     this.response = JSON.stringify(data);
    //   });

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

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //#region FORM
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
  //#endregion

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

  // Método para manejar la eliminación de archivos
  removeFile(fieldName: string, index: number) {
    if (this.uploadedFiles[fieldName]?.length > index) {
      const file = this.uploadedFiles[fieldName][index];

      // Liberar objectURL si existe
      // if (file.objectURL && file.objectURL.startsWith('blob:')) {
      //   URL.revokeObjectURL(file.objectURL);
      // }

      this.uploadedFiles[fieldName].splice(index, 1);

      // Actualizar el control del formulario
      const fieldConfig = this.config.fields.find((f) => f.name === fieldName);
      this.form
        .get(fieldName)
        ?.setValue(
          fieldConfig?.multiple
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

  // Método para obtener el icono según el tipo de archivo
  getFileIcon(file: any): string {
    if (!file) return 'pi pi-file text-gray-400';

    // Si es una imagen y tiene preview, mostrar miniaturas
    if (this.isImage(file) && file.objectURL) {
      return '';
    }

    const extension = file.name?.split('.').pop()?.toLowerCase() || '';
    const fileType = file.type || '';

    // Mapeo de tipos de archivo a iconos
    const iconMap: { [key: string]: string } = {
      pdf: 'pi pi-file-pdf text-red-500',
      doc: 'pi pi-file-word text-blue-500',
      docx: 'pi pi-file-word text-blue-500',
      xls: 'pi pi-file-excel text-green-500',
      xlsx: 'pi pi-file-excel text-green-500',
      ppt: 'pi pi-file-powerpoint text-orange-500',
      pptx: 'pi pi-file-powerpoint text-orange-500',
      txt: 'pi pi-file text-gray-500',
      csv: 'pi pi-file text-teal-500',
      zip: 'pi pi-file-archive text-purple-500',
      rar: 'pi pi-file-archive text-purple-500',
      '7z': 'pi pi-file-archive text-purple-500',
      jpg: 'pi pi-image',
      jpeg: 'pi pi-image',
      png: 'pi pi-image',
      gif: 'pi pi-image',
    };

    return (
      iconMap[extension] ||
      iconMap[fileType.split('/')[1]] ||
      'pi pi-file text-gray-400'
    );
  }
  //endregion

  //#region AutoComplete
  private fillAutocomplete(): void {
    this.itemsAutocomplete = [];
  }

  filterCountry(event: any): void {
    // console.log(event);
    // let _items = [...Array(10).keys()];

    // if (event.query) {
    //   this.itemsAutocomplete = event.query
    //     ? [...Array(10).keys()].map((item) => {
    //      { "name": event.query + '-' + item, "code" : item}
    //     } )
    //     : _items;
    // } else {
    //   this.itemsAutocomplete = _items;
    // }

    // Versión síncrona
    // this.itemsAutocomplete = this.ciudadesService.getCiudadesColombia();

    // Versión asíncrona (simulando API)
    // Luego en tu método:
    this.ciudadesService.getCiudadesAsync().then((ciudades: any[]) => {
      this.itemsAutocomplete = ciudades.map(
        (value): CiudadOption => ({
          key: value.id,
          value: value.nombre,
        })
      );
      console.log(this.itemsAutocomplete);
    });
  }

  onCitySelect(event: any, name: string) {
    console.log(event);
    this.form.get(name)?.setValue(event.value.key); // Guarda solo el ID
    //this.selectedUbicacion = event.value.value;
  }

  consultarLupa() {
    console.log('Consultando component table para lupa');
  }
  //#endregion
}
