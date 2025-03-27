export enum ActionsEnum {
    /** Cargue Financiero */
    CARGAR_MATRIZ_FINANCIERA = 'obr_btn_dl_mf',
    /** Gestión Obras */
    NUEVA_OBRA = 'obr_btn_nb',
    CARGAR_SOPORTES = 'obr_btn_cs',
    EDITAR_OBRA = 'obr_btn_edit',
    ESTRUCTURAS = 'obr_btn_str',
    DESCARGA_DISENO_OBRA = 'obr_btn_dno_dl',
    //Estructuras
    VER_DETALLE_ESTRUCTURA='obr_btn_ver_st',
    DESCARGA_PDF_ESTRUCTURA = 'obr_btn_dl_st',
    //Desmontar / Retirar
    DESMONTAR_MATERIALES = 'obr_btn_des',
    //Generar Estapas / Trabajos
    AGREGAR_TRABAJO = 'obr_btn_agr_tr',
    //Etapas / Trabajos
    VER_TRABAJO = 'obr_btn_ver_tr',
    ADJUTICACION_TRABAJO = 'obr_btn_djc_tr',
    ACTIVAR_REFORMADO = 'obr_btn_act_tr',
    CERRAR_REFORMADO = 'obr_btn_cerr_tr',
    REFORMADO_TRABAJO = 'obr_btn_rf_tr',
    TRAZABILIDAD_TRABAJO = 'obr_btn_traz_tr',
    TRABAJO_PARCIAL = 'obr_btn_tr_p_tr',
    //Ver detalle trabajo
    ACTUALIZAR_TRABAJO = 'obr_btn_actlzr_ver_tr',
    ANULAR_TRABAJO = 'obr_btn_nlr_ver_tr',
    //Reformado trabajo
    REFORMADO_AGREGAR_MATERIALES = 'obr_btn_agre_mat_tr',
    REFORMADO_ELIMINAR_MATERIAL = 'obr_btn_elim_mat_tr',
    REFORMADO_CARGA_MASIVA = 'obr_btn_crg_mat_tr',
    REFORMADO_EDITAR_MATERIAL = 'obr_btn_edit_mat_tr',
    REFORMADO_AGREGAR_CONCEPTO_PAGO = 'obr_btn_agre_cp_tr',
    REFORMADO_ELIMINAR_CONCEPTO_PAGO = 'obr_btn_elim_cp_tr',
    REFORMADO_EDITAR_CONCEPTO_PAGO = 'obr_btn_edit_cp_tr',
    //Editar Obra
    DISENO_TRABAJOS = 'obr_btn_ds_edit_trab',
    /** Obras Inversiones - Actas Obra */
    CIERRE_UNIDADES_CONSTRUCTIVAS = 'obr_btn_cr_ucc',
    INFORMACION_OBRA = 'obr_btn_inf_obr',
    DESCARGA_PDF_DISENO_OBRA_INVERSORES = 'obr_btn_dl_obr',
    // Detalle Actas
    VER_ESTRUCTURAS_OBRA_INVERSORES = 'obr_btn_ver_obr',
    AUDITORIA ='obr_btn_aditr_obr',
    DESCARGA_EJECUTADO = 'obr_btn_ejec_obr',
    /** Gestión Trabajos */
    DESCARGA_MATERIALES = 'obr_btn_dl_mts',
    DESCARGA_FACTURA = 'obr_btn_dl_pdf_mts',
    VER_DETALLE_TRABAJO_FINALIZADO = 'obr_btn_ver_dell_mts',
    EDITAR_TRABAJO = 'obr_btn_dl_edit_mts'

}