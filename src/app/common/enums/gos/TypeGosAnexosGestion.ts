export enum TypeGosAnexosGestion {
  EVIDENCIA = 'evidencia',
  ASISTENCIA = 'asistencia',
  ACTA = 'acta',
  CAUSALES = 'causal',
  ANOMALIA = 'anomalia',
  SOPORTE_PDF = 'pdf'
}

export const TypeGosAnexosGestionCode: { [key in TypeGosAnexosGestion]: string } = {
  [TypeGosAnexosGestion.EVIDENCIA]: 'GEVID',
  [TypeGosAnexosGestion.ASISTENCIA]: 'GASIS',
  [TypeGosAnexosGestion.ACTA]: 'GACTA',
  [TypeGosAnexosGestion.CAUSALES]: 'GCAU',
  [TypeGosAnexosGestion.ANOMALIA]: 'GANO',
  [TypeGosAnexosGestion.SOPORTE_PDF]: 'GPDF'
};