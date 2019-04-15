/*  //* topcg/scr/store.js
    //*  Establece la inicialización con Firebase y el almacen con las variables globales.

    //*  Muestra el menú de opciones    
======================================================================================================== */    

import Vue from 'vue';
import Vuex from 'vuex';

/*//? Importo las variables de las rutas y nodos de mi proyecto en Firebase */
import {
    db, 
    rutaUsuarios, dbUsuarios,
    rutaBitacora, dbBitacora,
    rutaValoresC, dbValoresC,

    rutaCV, dbCV,

    stg,
    rutaCVs, rutaFotosU,
    stgCVs, stgFotosU,
} from './myFirebaseApp'

/*//? Importa lod módulos de los catálogos geográficos y de "otros catálogos" */
import deptos       from './modules/deptos.js'
import munis        from './modules/munis.js'
import das          from './modules/das.js'
import dms          from './modules/dms.js'
import tipoS        from './modules/tipoS.js'
import ss           from './modules/ss.js'
import cargos       from './modules/cargos.js'
import responsables from './modules/responsables.js'

/*//? Importa lod módulos de los catálogos de cvs */
import cvs          from './modulesCVs/m_cvs.js'
import profesiones  from './modulesCVs/m_profesiones.js'
import puestos      from './modulesCVs/m_puestos.js'
import eciviles     from './modulesCVs/m_eciviles.js'

import bitacora     from './modulesCVs/m_bitacora.js'

/*//? Importa los getters y mutations comunes a todos los componentes */
import {getters}    from './getters'
import {mutations}  from './mutations';
import {actions}    from './actions';

Vue.use(Vuex);

/*//? Exportamos a través de la constante STORE los valores de la base de datos (db)
   la ruta, path o nodo a acceder */
export const store = new Vuex.Store({
    modules:{
        deptos, munis, das, dms, tipoS, ss, cargos, responsables,

        cvs,
        profesiones,
        puestos,
        eciviles,
        bitacora,
    },    
    state: {
        auth: true, 
        /*//? Obtiene el path del nodo de los casos y usuarios, así como la referencia para su acceso (st_dbxyz) */
        st_db:              db, 

        st_dbUsuarios: dbUsuarios,
        st_rutaUsuarios: rutaUsuarios,

        st_dbBitacora: dbBitacora,
        st_rutaBitacora: rutaBitacora,

        /*//? Propias para los valores predeterminados (configuración) */
        // st_valoresConf: { diasaviso: 0, 
        //                   diasrevision: 0
        //                 }, 
        st_valoresConf: [],
        st_dbValoresC: dbValoresC,
        st_rutaValoresC: rutaValoresC,

        st_dbCVs: dbCV,
        st_rutaCVs: rutaCV,
        st_rutaCVs: rutaCVs,

        /*//? ================================================================================================================================== */
        /*//? Para el pagineo de los CVs */
        st_limite: 5,

        /*//? Propios de la bitácora */
        st_bitacora: [],
        
        /*//? Propios de RRHH */
        st_CVs: [], 
        st_profesiones: [],
        st_puestos: [], st_ECiviles: [],

        st_grabando: false, st_eliminando: false,
        st_cargando: false, st_mostrarCargador: false,

        /*//? Obtiene el path de la carpeta de los CVs y Fotos de usuarios
         *  así como la referencia para su acceso (st_sthxyz) */
        st_stg: stg,
        st_rutaFotosU: rutaFotosU,

        st_stgCVs: stgCVs,
        st_stgFotosU: stgFotosU,

        /*//? Datos del usuario en sesión */
        st_logeado:     false,      // Está logeado
        st_usuario:     "",         // Almacena la UID del usuario
        st_clave:       "",         // Clave del usuario
        st_email:       "",         // Email
        st_nusuario:    "",         // Nombre del usuario
        st_usuarios:    [],         // Objeto con el nodo de los usuarios
        st_roles:       "",         // Roles del usuario en sesión
        st_activo:      "",         // Está activo el usuario ?
        st_admin:       false,      // Si es Administrador.
        st_empresa:     "",         // Nombre de la empresa a la que pertenece el usuario.
        st_llave:       "",

        /*//? Variables para el pagineo de registros */
        pagina: 1,
        lini:0, lfin: 5, limite: 5, diferencia: 5,
        esLimiteSup: false, esLimiteInf: true,

        /*//? Limites inicial y final para los Casos */
        Cpagina: 1, Clini: 0, Clfin: 5, CesLimiteSup: false, CesLimiteInf: true,
        
        /*//? Limites inicial y final para los Departamentos */
        Dpagina: 1, Dlini: 0, Dlfin: 5, DesLimiteSup: false, DesLimiteInf: true,

        /*//? Limites inicial y final para los Departamentos */
        Mpagina: 1, Mlini: 0, Mlfin: 5, MesLimiteSup: false, MesLimiteInf: true,
        
        /*//? Limites inicial y final para las áreas de salud */
        DASpagina: 1, DASlini: 0, DASlfin: 5, DASesLimiteSup: false, DASesLimiteInf: true,

        /*//? Limites inicial y final para las áreas de salud */
        DMSpagina: 1, DMSlini: 0, DMSlfin: 5, DMSesLimiteSup: false, DMSesLimiteInf: true,

        /*//? Limites inicial y final para los Tipos de Servicio */
        TSpagina: 1, TSlini: 0, TSlfin: 5, TSesLimiteSup: false, TSesLimiteInf: true,

        /*//? Limites inicial y final para los Servicios de Salud */
        SSpagina: 1, SSlini: 0, SSlfin: 5, SSesLimiteSup: false, SSesLimiteInf: true,

        /*//? ********************************************************************************************* */
        /*//? Limites inicial y final para los CARGOS y RESPONSABLES */
        CGpagina: 1, CGlini: 0, CGlfin: 5, CGesLimiteSup: false, CGesLimiteInf: true,
        Rpagina: 1, Rlini: 0, Rlfin: 5, ResLimiteSup: false, ResLimiteInf: true,

        /*//? ********************************************************************************************* */
        /*//? Limites inicial y final para los Servicios de Salud */
        Prpagina: 1, Prlini: 0, Prlfin: 5, PresLimiteSup: false, PresLimiteInf: true,

        /*//? temporales */
        st_deptos:[],
        objFoto: [], objCV: [],
        st_urlfoto: "",
        st_urlcv: "",
    },
    
    getters: getters,
    mutations: mutations, 
    actions: actions,
});