import { Component, Input, OnInit } from '@angular/core';

// Components
import { TableGenericComponent } from '../shared/components/general/table-generic/table-generic.component';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

// Models
import { ITable, TypeColumn, TypeFormat } from '../models/general/ITable';
import { DynamicForm02Component } from '../dynamic-form02/dynamic-form02.component';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';

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
  selector: 'app-dynamic-crud',
  standalone: true,
  imports: [
    ButtonModule,
    TableGenericComponent,
    DialogModule,
    DynamicForm02Component,
  ],
  templateUrl: './dynamic-crud.component.html',
  styleUrl: './dynamic-crud.component.scss',
})
export class DynamicCrudComponent implements OnInit {
  //@Input() brigadas: any[] = [];
  @Input() brigadas: any[] = [
    {
      id_orden: '1801764',
      contratista: 'INMEL INGENIERIA S.A.S_7',
      territorial: 'ATLANTICO NORTE',
      zona: 'Atlantico Norte_2',
      acta: '3789251',
      fechaejecucion: '2025-03-20T09:24:01Z',
      fechainicial: '2025-03-20T09:24:01Z',
      fechafinal: '2025-03-20T09:25:45Z',
      numero_orden: '120979824',
      fecha_Sincronizacion: '2025-03-20T00:00:00Z',
      hora_Sincronizacion: '09:25:22',
      nic: '6584413',
      ciudad: 'BARRANQUILLA',
      barrio: 'ALTOS DEL PARQUE',
      direccion: 'CL 99A CR 52 - 160 APTO 901 ER9768',
      tipo_orden: 'TO501',
      tipo_proceso: 'SCR',
      accion: 'Fallo - Imposibilidad técnica',
      subaccion: 'GABINETE',
      caracterizacion: null,
      num_factura: '3',
      deuda_ejec: '$ 780.673,64',
      tarifa: null,
      tipo_actividad: null,
      actividad: 'Residencial',
      tipo_suspension: 'M - MULTIFAMILIAR',
      gps: '11.0141708,-74.8289019',
      vehiculo: 'CARRO CANASTA',
      tipo_operativa: 'SCR LIVIANA',
      id_contratista_persona: '1129517867',
      nombre_contratista_persona: 'JAIR ANTONIO ROSALES ALTAMAR',
      observacion:
        'Fecha: 20-MAR-25, ACTA: 3789251, TECNICO: JAIR ANTONIO ROSALES ALTAMAR, PREDIO: Ocupado, ATENDIO: no, MEDIDOR: 36949939-MC036, LECTURA: 0, CT: , MT: , Otros: VS: ;VM:  ',
      origen: 'OSF',
      urlDescargaActa:
        'https://op360.air-e.com/jri/report?_repName=op360/scr/ScrActa001&_dataSource=op360&_repFormat=pdf&prIdImg=8&prIdOrden=1801764',
    },
    {
      id_orden: '1805216',
      contratista: 'INMEL INGENIERIA S.A.S_7',
      territorial: 'ATLANTICO CENTRO',
      zona: 'Atlantico Centro_61',
      acta: '3783988',
      fechaejecucion: '2025-03-20T16:35:58Z',
      fechainicial: '2025-03-20T16:35:58Z',
      fechafinal: '2025-03-20T16:40:54Z',
      numero_orden: '121683365',
      fecha_Sincronizacion: '2025-03-20T00:00:00Z',
      hora_Sincronizacion: '16:40:55',
      nic: '7794799',
      ciudad: 'SOLEDAD',
      barrio: 'ORIENTAL',
      direccion: 'CL 21 CR 23 - 57 PISO 1 APTO 1 DG3290',
      tipo_orden: 'TO501',
      tipo_proceso: 'SCR',
      accion: 'Éxito - Suspensión aerea sin retiro de acometida',
      subaccion: 'SUSPENSIÓN AEREA SIN RETIRO DE ACOMETIDA',
      caracterizacion: null,
      num_factura: '3',
      deuda_ejec: '$ 144.859,04',
      tarifa: 'ESTRATO 2',
      tipo_actividad: null,
      actividad: 'Residencial',
      tipo_suspension: 'T - TENDIDO',
      gps: '10.9209845,-74.765938',
      vehiculo: 'CARRO CANASTA',
      tipo_operativa: 'SCR PESADA',
      id_contratista_persona: '1079654630',
      nombre_contratista_persona: 'OSWALDO SIERRA SIERRA',
      observacion:
        'Fecha: 20-MAR-25, ACTA: 3783988, TECNICO: OSWALDO SIERRA SIERRA, PREDIO: Ocupado, ATENDIO: no, MEDIDOR: 001376132-MC988, LECTURA: 0, CT: , MT: , Otros: VS: ;MDV: ;VM: ;RI:  ',
      origen: 'OSF',
      urlDescargaActa:
        'https://op360.air-e.com/jri/report?_repName=op360/scr/ScrActa001&_dataSource=op360&_repFormat=pdf&prIdImg=8&prIdOrden=1805216',
    },
    {
      id_orden: '1805866',
      contratista: 'INMEL INGENIERIA S.A.S_7',
      territorial: 'ATLANTICO NORTE',
      zona: 'Atlantico Norte_2',
      acta: null,
      fechaejecucion: '0001-01-01T00:00:00',
      fechainicial: '2025-03-20T09:20:06Z',
      fechafinal: '2025-03-20T09:20:06Z',
      numero_orden: '121666623',
      fecha_Sincronizacion: '2025-03-20T00:00:00Z',
      hora_Sincronizacion: '09:20:06',
      nic: '2105741',
      ciudad: 'BARRANQUILLA',
      barrio: 'CIUDAD JARDIN ',
      direccion: 'CR 42G CL 80 - 79 ARCO AC CG8161',
      tipo_orden: 'TO501',
      tipo_proceso: 'SCR',
      accion: 'Fallo - Sin gestión',
      subaccion: 'Fallo - Sin gestión - ',
      caracterizacion: null,
      num_factura: '5',
      deuda_ejec: '$ 1.796.702,99',
      tarifa: 'ESTRATO 4',
      tipo_actividad: null,
      actividad: null,
      tipo_suspension: 'M - MULTIFAMILIAR',
      gps: '0,0',
      vehiculo: null,
      tipo_operativa: null,
      id_contratista_persona: null,
      nombre_contratista_persona: null,
      observacion:
        'Fecha: , ACTA: , TECNICO: , PREDIO: , ATENDIO: no, MEDIDOR: , LECTURA: 0, CT: , MT: , Otros:  ',
      origen: 'OSF',
      urlDescargaActa:
        'https://op360.air-e.com/jri/report?_repName=op360/scr/ScrActa001&_dataSource=op360&_repFormat=pdf&prIdImg=8&prIdOrden=1805866',
    },
    {
      id_orden: '1809307',
      contratista: 'INMEL INGENIERIA S.A.S_7',
      territorial: 'ATLANTICO NORTE',
      zona: 'Atlantico Norte_2',
      acta: null,
      fechaejecucion: '0001-01-01T00:00:00',
      fechainicial: '2025-03-20T17:49:02Z',
      fechafinal: '2025-03-20T17:49:02Z',
      numero_orden: '121629717',
      fecha_Sincronizacion: '2025-03-20T00:00:00Z',
      hora_Sincronizacion: '17:49:02',
      nic: '7883305',
      ciudad: 'BARRANQUILLA',
      barrio: 'CIUDAD JARDIN ',
      direccion: 'CR 42 CL 76 - 79 APTO 803 CG6135',
      tipo_orden: 'TO501',
      tipo_proceso: 'SCR',
      accion: 'Fallo - Sin gestión',
      subaccion: 'Fallo - Sin gestión - ',
      caracterizacion: null,
      num_factura: '1',
      deuda_ejec: '$ 219.072,46',
      tarifa: 'ESTRATO 5',
      tipo_actividad: null,
      actividad: null,
      tipo_suspension: 'M - MULTIFAMILIAR',
      gps: '0,0',
      vehiculo: null,
      tipo_operativa: null,
      id_contratista_persona: null,
      nombre_contratista_persona: null,
      observacion:
        'Fecha: , ACTA: , TECNICO: , PREDIO: , ATENDIO: no, MEDIDOR: , LECTURA: 0, CT: , MT: , Otros:  ',
      origen: 'OSF',
      urlDescargaActa:
        'https://op360.air-e.com/jri/report?_repName=op360/scr/ScrActa001&_dataSource=op360&_repFormat=pdf&prIdImg=8&prIdOrden=1809307',
    },
    {
      id_orden: '1814019',
      contratista: 'INMEL INGENIERIA S.A.S_7',
      territorial: 'ATLANTICO NORTE',
      zona: 'Atlantico Norte_2',
      acta: null,
      fechaejecucion: '0001-01-01T00:00:00',
      fechainicial: '2025-03-20T17:49:04Z',
      fechafinal: '2025-03-20T17:49:04Z',
      numero_orden: '121594830',
      fecha_Sincronizacion: '2025-03-20T00:00:00Z',
      hora_Sincronizacion: '17:49:04',
      nic: '7638777',
      ciudad: 'PUERTO COLOMBIA',
      barrio: 'VILLA CAMPESTRE ',
      direccion: 'AV LOS ROBLES 132 - 80 APTO 201 CN4779',
      tipo_orden: 'TO501',
      tipo_proceso: 'SCR',
      accion: 'Fallo - Sin gestión',
      subaccion: 'Fallo - Sin gestión - ',
      caracterizacion: null,
      num_factura: '5',
      deuda_ejec: '$ 2.906.777,27',
      tarifa: 'ESTRATO 6',
      tipo_actividad: null,
      actividad: null,
      tipo_suspension: 'M - MULTIFAMILIAR',
      gps: '0,0',
      vehiculo: null,
      tipo_operativa: null,
      id_contratista_persona: null,
      nombre_contratista_persona: null,
      observacion:
        'Fecha: , ACTA: , TECNICO: , PREDIO: , ATENDIO: no, MEDIDOR: , LECTURA: 0, CT: , MT: , Otros:  ',
      origen: 'OSF',
      urlDescargaActa:
        'https://op360.air-e.com/jri/report?_repName=op360/scr/ScrActa001&_dataSource=op360&_repFormat=pdf&prIdImg=8&prIdOrden=1814019',
    },
    {
      id_orden: '1816389',
      contratista: 'INMEL INGENIERIA S.A.S_7',
      territorial: 'ATLANTICO CENTRO',
      zona: 'Atlantico Centro_61',
      acta: '3783987',
      fechaejecucion: '2025-03-20T16:18:11Z',
      fechainicial: '2025-03-20T16:18:11Z',
      fechafinal: '2025-03-20T16:24:16Z',
      numero_orden: '114771024',
      fecha_Sincronizacion: '2025-03-20T00:00:00Z',
      hora_Sincronizacion: '16:24:18',
      nic: '2130361',
      ciudad: 'SOLEDAD',
      barrio: 'ORIENTAL',
      direccion: 'CL 21 CR 23 - 60 DPL DG3291',
      tipo_orden: 'TO501',
      tipo_proceso: 'SCR',
      accion: 'Éxito - Suspensión aerea sin retiro de acometida',
      subaccion: 'SUSPENSIÓN AEREA SIN RETIRO DE ACOMETIDA',
      caracterizacion: null,
      num_factura: '4',
      deuda_ejec: '$ 172.344,80',
      tarifa: 'ESTRATO 2',
      tipo_actividad: null,
      actividad: 'Residencial',
      tipo_suspension: 'T - TENDIDO',
      gps: '10.9208534,-74.7660488',
      vehiculo: 'CARRO CANASTA',
      tipo_operativa: 'SCR PESADA',
      id_contratista_persona: '1079654630',
      nombre_contratista_persona: 'OSWALDO SIERRA SIERRA',
      observacion:
        'Fecha: 20-MAR-25, ACTA: 3783987, TECNICO: OSWALDO SIERRA SIERRA, PREDIO: Ocupado, ATENDIO: no, MEDIDOR: 3652814-MC078, LECTURA: 0, CT: , MT: , Otros: VS: ;MDV: ;VM: ;RI:  ',
      origen: 'OSF',
      urlDescargaActa:
        'https://op360.air-e.com/jri/report?_repName=op360/scr/ScrActa001&_dataSource=op360&_repFormat=pdf&prIdImg=8&prIdOrden=1816389',
    },
    {
      id_orden: '1816456',
      contratista: 'INMEL INGENIERIA S.A.S_7',
      territorial: 'ATLANTICO NORTE',
      zona: 'Atlantico Norte 2_3',
      acta: '3785336',
      fechaejecucion: '2025-03-20T16:41:26Z',
      fechainicial: '2025-03-20T16:41:26Z',
      fechafinal: '2025-03-20T16:45:24Z',
      numero_orden: '114749402',
      fecha_Sincronizacion: '2025-03-20T00:00:00Z',
      hora_Sincronizacion: '16:44:28',
      nic: '2056627',
      ciudad: 'BARRANQUILLA',
      barrio: 'CEVILLAR',
      direccion: 'CR 18 CL 46 - 49 PISO 1 APTO 01 BA7154',
      tipo_orden: 'TO501',
      tipo_proceso: 'SCR',
      accion: 'Fallo - Imposibilidad técnica',
      subaccion: 'PREDIO ENREJADO',
      caracterizacion: null,
      num_factura: '3',
      deuda_ejec: '$ 2.395.129,51',
      tarifa: 'COMERCIAL',
      tipo_actividad: null,
      actividad: 'Residencial',
      tipo_suspension: 'M - MULTIFAMILIAR',
      gps: '10.9564112,-74.803535',
      vehiculo: 'CARRO CANASTA',
      tipo_operativa: 'SCR MULTIFAMILIAR',
      id_contratista_persona: '722016800',
      nombre_contratista_persona: 'JOHN ARCON ESCORCIA ',
      observacion:
        'Fecha: 20-MAR-25, ACTA: 3785336, TECNICO: JOHN ARCON ESCORCIA , PREDIO: Ocupado, ATENDIO: no, MEDIDOR: 23051142-MCA56, LECTURA: 0, CT: , MT: , Otros: VS: ;VM:  ',
      origen: 'OSF',
      urlDescargaActa:
        'https://op360.air-e.com/jri/report?_repName=op360/scr/ScrActa001&_dataSource=op360&_repFormat=pdf&prIdImg=8&prIdOrden=1816456',
    },
    {
      id_orden: '1816457',
      contratista: 'INMEL INGENIERIA S.A.S_7',
      territorial: 'ATLANTICO NORTE',
      zona: 'Atlantico Norte 2_3',
      acta: '3785335',
      fechaejecucion: '2025-03-20T16:09:07Z',
      fechainicial: '2025-03-20T16:09:07Z',
      fechafinal: '2025-03-20T16:12:16Z',
      numero_orden: '114748912',
      fecha_Sincronizacion: '2025-03-20T00:00:00Z',
      hora_Sincronizacion: '16:12:18',
      nic: '6840228',
      ciudad: 'BARRANQUILLA',
      barrio: 'CEVILLAR',
      direccion: 'CR 18 CL 46 - 5 PISO 2 APTO 3 BA7143',
      tipo_orden: 'TO501',
      tipo_proceso: 'SCR',
      accion: 'Fallo - Imposibilidad técnica',
      subaccion: 'PREDIO ENREJADO',
      caracterizacion: null,
      num_factura: '4',
      deuda_ejec: '$ 358.491,36',
      tarifa: 'ESTRATO 3',
      tipo_actividad: null,
      actividad: 'Residencial',
      tipo_suspension: 'M - MULTIFAMILIAR',
      gps: '10.960121,-74.7995093',
      vehiculo: 'CARRO CANASTA',
      tipo_operativa: 'SCR MULTIFAMILIAR',
      id_contratista_persona: '722016800',
      nombre_contratista_persona: 'JOHN ARCON ESCORCIA ',
      observacion:
        'Fecha: 20-MAR-25, ACTA: 3785335, TECNICO: JOHN ARCON ESCORCIA , PREDIO: Ocupado, ATENDIO: no, MEDIDOR: 4663300-MC936, LECTURA: 0, CT: , MT: , Otros: VS: ;VM:  ',
      origen: 'OSF',
      urlDescargaActa:
        'https://op360.air-e.com/jri/report?_repName=op360/scr/ScrActa001&_dataSource=op360&_repFormat=pdf&prIdImg=8&prIdOrden=1816457',
    },
    {
      id_orden: '1817166',
      contratista: 'INMEL INGENIERIA S.A.S_7',
      territorial: 'ATLANTICO NORTE',
      zona: 'Atlantico Norte_2',
      acta: '3790315',
      fechaejecucion: '2025-03-20T15:50:59Z',
      fechainicial: '2025-03-20T15:50:59Z',
      fechafinal: '2025-03-20T15:52:55Z',
      numero_orden: '113676949',
      fecha_Sincronizacion: '2025-03-20T00:00:00Z',
      hora_Sincronizacion: '16:23:42',
      nic: '7663447',
      ciudad: 'BARRANQUILLA',
      barrio: 'LAS MERCEDES ',
      direccion: 'CR 38A CL 76 - 15 APTO 201 CG1339',
      tipo_orden: 'TO501',
      tipo_proceso: 'SCR',
      accion: 'Fallo - Acceso impedido',
      subaccion: 'MULTIFAMILIAR/MULTICOMERCIAL',
      caracterizacion: null,
      num_factura: '5',
      deuda_ejec: '$ 818.937,52',
      tarifa: 'ESTRATO 4',
      tipo_actividad: null,
      actividad: 'Residencial',
      tipo_suspension: 'M - MULTIFAMILIAR',
      gps: '10.9878085,-74.817133',
      vehiculo: 'CARRO CANASTA',
      tipo_operativa: 'SCR MULTIFAMILIAR',
      id_contratista_persona: '10473614510',
      nombre_contratista_persona: 'DEYVID JOSE PERTUZ POLO',
      observacion:
        'Fecha: 20-MAR-25, ACTA: 3790315, TECNICO: DEYVID JOSE PERTUZ POLO, PREDIO: Ocupado, ATENDIO: no apto , MEDIDOR: 1301617580-MC981, LECTURA: 0, CT: , MT: , Otros: VS: ;VM:  ',
      origen: 'OSF',
      urlDescargaActa:
        'https://op360.air-e.com/jri/report?_repName=op360/scr/ScrActa001&_dataSource=op360&_repFormat=pdf&prIdImg=8&prIdOrden=1817166',
    },
    {
      id_orden: '1817291',
      contratista: 'INMEL INGENIERIA S.A.S_7',
      territorial: 'ATLANTICO CENTRO',
      zona: 'Atlantico Centro_61',
      acta: null,
      fechaejecucion: '0001-01-01T00:00:00',
      fechainicial: '2025-03-20T14:43:02Z',
      fechafinal: '2025-03-20T14:43:02Z',
      numero_orden: '113388188',
      fecha_Sincronizacion: '2025-03-20T00:00:00Z',
      hora_Sincronizacion: '14:43:02',
      nic: '7305679',
      ciudad: 'SOLEDAD',
      barrio: 'MORAS OCCIDENTE',
      direccion: 'CL 69 # 19 - 18 P1A2 D6964',
      tipo_orden: 'TO501',
      tipo_proceso: 'SCR',
      accion: 'Fallo - Sin gestión',
      subaccion: 'Fallo - Sin gestión - ',
      caracterizacion: null,
      num_factura: '5',
      deuda_ejec: '$ 107.224,98',
      tarifa: 'ESTRATO 1',
      tipo_actividad: null,
      actividad: null,
      tipo_suspension: 'M - MULTIFAMILIAR',
      gps: '0,0',
      vehiculo: null,
      tipo_operativa: null,
      id_contratista_persona: null,
      nombre_contratista_persona: null,
      observacion:
        'Fecha: , ACTA: , TECNICO: , PREDIO: , ATENDIO: no, MEDIDOR: , LECTURA: 0, CT: , MT: , Otros:  ',
      origen: 'OSF',
      urlDescargaActa:
        'https://op360.air-e.com/jri/report?_repName=op360/scr/ScrActa001&_dataSource=op360&_repFormat=pdf&prIdImg=8&prIdOrden=1817291',
    },
  ];
  public table: ITable = {
    fieldId: 'id_contratista',
    paginator: false,
    columns: [
      {
        field: 'nombre_contratista_persona',
        label: 'Nombre',
        type: TypeColumn.STRING,
        format: TypeFormat.UPPERCASE,
      },
      {
        field: 'identificacion_contratista_persona',
        label: 'Identificación',
        type: TypeColumn.STRING,
      },
      {
        field: 'zonas',
        label: 'Zonas',
        type: TypeColumn.STRING,
        format: TypeFormat.UPPERCASE,
      },
      {
        field: 'id_contratista_persona',
        label: 'Detalle',
        type: TypeColumn.ACTION,
        icon: 'pi-arrow-circle-right',
      },
    ],
  };
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
