export interface IGosInstanceFile {
    id_cargue_instancia: number;
	id_cargue:number;
	numero_registros_archivo: number;
	numero_registros_procesados: number;
	numero_errores: number;
	fecha_inicio_cargue: string;
	fecha_fin_cargue: string;
	duracion: string;
	id_usuario_registro: number;
	fecha_registro: string;
	id_estado_intancia: number;
	observaciones: string;
	nombre_archivo: string;
	id_soporte: number;
	pathwebdescarga: string;
}