// ciudades.service.ts
import { Injectable } from '@angular/core';

export interface Ciudad {
  id: number;
  nombre: string;
  departamento: string;
  poblacion: number;
  fundacion: number;
  altitud: number;
  clima: string;
}

@Injectable({
  providedIn: 'root',
})
export class CiudadesService {
  constructor() {}

  getCiudadesColombia(): Ciudad[] {
    return [
      {
        id: 1,
        nombre: 'Bogotá',
        departamento: 'Cundinamarca',
        poblacion: 7412000,
        fundacion: 1538,
        altitud: 2640,
        clima: 'Frío',
      },
      {
        id: 2,
        nombre: 'Medellín',
        departamento: 'Antioquia',
        poblacion: 2529000,
        fundacion: 1616,
        altitud: 1495,
        clima: 'Templado',
      },
      {
        id: 3,
        nombre: 'Cali',
        departamento: 'Valle del Cauca',
        poblacion: 2221000,
        fundacion: 1536,
        altitud: 995,
        clima: 'Cálido',
      },
      {
        id: 4,
        nombre: 'Barranquilla',
        departamento: 'Atlántico',
        poblacion: 1232000,
        fundacion: 1629,
        altitud: 18,
        clima: 'Cálido',
      },
      {
        id: 5,
        nombre: 'Cartagena',
        departamento: 'Bolívar',
        poblacion: 914000,
        fundacion: 1533,
        altitud: 2,
        clima: 'Cálido',
      },
      {
        id: 6,
        nombre: 'Bucaramanga',
        departamento: 'Santander',
        poblacion: 581000,
        fundacion: 1622,
        altitud: 959,
        clima: 'Templado',
      },
      {
        id: 7,
        nombre: 'Pereira',
        departamento: 'Risaralda',
        poblacion: 472000,
        fundacion: 1863,
        altitud: 1411,
        clima: 'Templado',
      },
      {
        id: 8,
        nombre: 'Santa Marta',
        departamento: 'Magdalena',
        poblacion: 500000,
        fundacion: 1525,
        altitud: 6,
        clima: 'Cálido',
      },
    ];
  }

  getCiudadesAsync(): Promise<Ciudad[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getCiudadesColombia());
      }, 1000); // Simula un retraso de red
    });
  }
}
