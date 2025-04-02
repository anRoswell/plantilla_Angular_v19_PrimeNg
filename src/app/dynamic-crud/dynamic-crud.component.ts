import { Component, Input, OnInit } from '@angular/core';

// Components
import { TableGenericComponent } from '../shared/components/general/table-generic/table-generic.component';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';

// Models
import { ITable, TypeColumn, TypeFormat } from '../models/general/ITable';
import { DynamicForm02Component } from '../dynamic-form02/dynamic-form02.component';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';

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
  uploadUrl?: string;
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

@Component({
  selector: 'app-dynamic-crud',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DynamicForm02Component,
    DatePickerModule,
  ],
  templateUrl: './dynamic-crud.component.html',
  styleUrl: './dynamic-crud.component.scss',
})
export class DynamicCrudComponent implements OnInit {
  public visible: boolean = false;
  formConfig!: FormConfig;
  isEditMode = false;
  formData: any = {};

  constructor() {}

  ngOnInit() {
    // Configuración del formulario desde JSON (puede venir de una API)
    this.formConfig = {
      title: 'Formulario de Datos Personales',
      submitLabel: 'Guardar Información',
      fields: [
        {
          type: 'input',
          inputType: 'text',
          name: 'nombre',
          label: 'Nombre Completo',
          required: true,
          placeholder: 'Ingrese su nombre completo',
          errorMessage: 'El nombre es obligatorio',
          gridClass: 'flex-auto',
        },
        {
          type: 'input',
          inputType: 'email',
          name: 'email',
          label: 'Correo Electrónico',
          required: true,
          validators: [Validators.email],
          placeholder: 'ejemplo@correo.com',
          errorMessage: 'Ingrese un correo electrónico válido',
          gridClass: 'flex-auto',
        },
        {
          type: 'input',
          inputType: 'tel',
          name: 'telefono',
          label: 'Teléfono',
          placeholder: 'Ingrese su número telefónico',
          gridClass: 'flex-auto',
        },
        {
          type: 'dropdown',
          name: 'pais',
          label: 'País',
          placeholder: 'Seleccione su país',
          required: true,
          options: [
            { value: 'mx', label: 'México' },
            { value: 'es', label: 'España' },
            { value: 'co', label: 'Colombia' },
            { value: 'ar', label: 'Argentina' },
            { value: 'pe', label: 'Perú' },
            { value: 'cl', label: 'Chile' },
          ],
          gridClass: 'flex-auto',
        },
        {
          type: 'calendar',
          name: 'fechaNacimiento',
          label: 'Fecha de Nacimiento',
          required: true,
          gridClass: 'flex-auto',
        },
        {
          type: 'dropdown',
          name: 'genero',
          label: 'Género',
          options: [
            { value: 'M', label: 'Masculino' },
            { value: 'F', label: 'Femenino' },
            { value: 'O', label: 'Otro' },
            { value: 'N', label: 'Prefiero no decir' },
          ],
          gridClass: 'flex-auto',
        },
        {
          type: 'inputNumber',
          name: 'edad',
          label: 'Edad',
          gridClass: 'flex-auto',
        },
        {
          type: 'multiselect',
          name: 'intereses',
          label: 'Intereses',
          options: [
            { value: 'deportes', label: 'Deportes' },
            { value: 'lectura', label: 'Lectura' },
            { value: 'viajes', label: 'Viajes' },
            { value: 'musica', label: 'Música' },
            { value: 'cine', label: 'Cine' },
          ],
          gridClass: 'p-col-12',
        },
        {
          type: 'textarea',
          name: 'direccion',
          label: 'Dirección',
          placeholder: 'Ingrese su dirección completa',
          gridClass: 'p-col-12',
        },
        {
          type: 'inputSwitch',
          name: 'notificaciones',
          label: 'Deseo recibir notificaciones',
          gridClass: 'flex-auto',
        },
        {
          type: 'file',
          name: 'Documentos',
          label: 'Cargar documentos',
          gridClass: 'flex-auto',
          multiple: true, // o true
          preview: true,
          maxFileSize: 5000000, // 5MB
          acceptedTypes:
            '.pdf,.jpg,.png, text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml, .xls, .xlsx',
        },
        // {
        //   type: 'file',
        //   name: 'contrato',
        //   label: 'Contrato firmado',
        //   multiple: false,
        //   preview: true,
        //   gridClass: 'flex-auto',
        //   acceptedTypes:
        //     '.pdf,.jpg,.png, text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml, .xls, .xlsx',
        //   maxFileSize: 2000000, // 2MB
        // },
        {
          type: 'checkbox',
          name: 'terminos',
          label: 'Acepto los términos y condiciones',
          required: true,
          errorMessage: 'Debe aceptar los términos para continuar',
          gridClass: 'p-col-12',
        },
      ],
    };

    // Para modo edición, cargaríamos datos existentes
    if (this.isEditMode) {
      // Estos datos podrían venir de una API
      this.formData = {
        nombre: 'Juan Pérez González',
        email: 'juan@ejemplo.com',
        telefono: '+52 55 1234 5678',
        pais: 'mx',
        fechaNacimiento: new Date(1990, 5, 15),
        genero: 'M',
        edad: 32,
        intereses: ['deportes', 'musica'],
        direccion: 'Calle Principal #123, Colonia Centro, Ciudad de México',
        notificaciones: true,
        terminos: true,
        documentos: [
          {
            name: 'documento1.pdf',
            size: 123456,
            type: 'application/pdf',
            objectURL: 'assets/documents/doc1.pdf', // Ruta al archivo existente
          },
          {
            name: 'foto-perfil.jpg',
            size: 154823,
            type: 'image/jpeg',
            objectURL: 'assets/images/profile-placeholder.jpg', // Ruta a una imagen de ejemplo
          },
        ],
        // contrato: {
        //   name: 'contrato-empleo.docx',
        //   size: 42156,
        //   type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        //   objectURL: 'assets/file-icons/doc-icon.png',
        // },
      };
    }
  }

  showDialog() {
    this.visible = true;
  }

  //#region
  onFormSubmit(formData: any) {
    console.log('Datos del formulario:', formData);
    // Aquí podrías enviar los datos a tu API
    if (this.isEditMode) {
      // Lógica para actualizar
      console.log('Actualizando usuario...');
    } else {
      // Lógica para crear
      console.log('Creando nuevo usuario...');
    }
  }
  //#endregion
}
