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
import { MessageService } from 'primeng/api';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';

import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface FormField {
  type: string; // input, select, textarea, checkbox, calendar, etc
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
}

interface FormGroupConfig {
  [key: string]: [any, any[]];
}

export interface FormConfig {
  fields: FormField[];
  title?: string;
  submitLabel?: string;
}

@Component({
  selector: 'app-dynamic-form02',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    ReactiveFormsModule,
    InputSwitchModule,
    MultiSelectModule,
    InputNumberModule,
    CalendarModule,
    ToastModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    DatePickerModule,
    FluidModule,
  ],
  templateUrl: './dynamic-form02.component.html',
  styleUrl: './dynamic-form02.component.scss',
  providers: [MessageService],
})
export class DynamicForm02Component implements OnInit {
  @Input()
  config!: FormConfig;
  @Input() formData: any = {};
  @Output() formSubmit = new EventEmitter<any>();

  date1: Date | undefined;

  form: FormGroup;
  fields: FormField[] = [];

  public response: string = '';

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private httpClient: HttpClient
  ) {
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
    console.log(this.form.valid);

    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Formulario enviado correctamente',
      });
    } else {
      this.markFormGroupTouched(this.form);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, revise los campos marcados en rojo',
      });
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
}
