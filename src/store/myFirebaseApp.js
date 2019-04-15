/**
    myFirebaseApp.js

    Accede a la configuración del proyecto FB que usaré en mi aplicación. 
    Las rutas son los nodos a los que accederé a través de los dbXXXXX.
    **********************************************************************************************************************************
 */
import firebase from "firebase";

/* Obtenemos la configuración de nuestro proyecto en Firebase */
var config = {

     apiKey: "AIzaSyB1ntXdCdrNcOYxGjM8uXty3Cn-dANg8oo",
     authDomain: "proyectovue-6f587.firebaseapp.com",
     databaseURL: "https://proyectovue-6f587.firebaseio.com",
     projectId: "proyectovue-6f587",
     storageBucket: "proyectovue-6f587.appspot.com",
     messagingSenderId: "715950277343"
};

/* Inicializamos la configuración */
firebase.initializeApp(config); // Inicializamos la configuración de FB

export const rutaUsuarios = "/usuarios";
export const rutaBitacora = "/bitacora";
export const rutaValoresC = "/configuracion";

export const rutaDeptos = "/catalogos/deptos";
export const rutaMunis = "/catalogos/munis";
export const rutaDAS = "/catalogos/das";
export const rutaDMS = "/catalogos/dms";
export const rutaTipoS = "/catalogos/tipoS";
export const rutaSS = "/catalogos/ss";
export const rutaCargos = "/catalogos/cargos";
export const rutaResponsables = "/catalogos/responsables";

export const rutaCV = "/cvs"
export const rutaProfesiones = "/catalogos/profesiones";
export const rutaECiviles = "/catalogos/eciviles";
export const rutaPuestos = "/catalogos/puestos";

/** //? Direccionamiento a Firebase */
export const db = firebase.database(); // Accedemos a la Base de datos

/** //? Direccionamiento a cada nodo */
export const dbUsuarios = db.ref(rutaUsuarios);
export const dbBitacora = db.ref(rutaBitacora);
export const dbValoresC = db.ref(rutaValoresC);

export const dbDeptos = db.ref(rutaDeptos);
export const dbMunis = db.ref(rutaMunis);
export const dbDAS = db.ref(rutaDAS);
export const dbDMS = db.ref(rutaDMS);
export const dbTipoS = db.ref(rutaTipoS);
export const dbSS = db.ref(rutaSS);
export const dbCargos = db.ref(rutaCargos);
export const dbResponsables = db.ref(rutaResponsables);

export const dbCV = db.ref(rutaCV);
export const dbProfesiones = db.ref(rutaProfesiones);
export const dbECiviles =     db.ref(rutaECiviles);
export const dbPuestos =      db.ref(rutaPuestos);

/** ================================================================================================================== */

/** Obtenemos las rutas para las carpetas del Storage donde estarán:  */
export const rutaCVs     = "/cvs/";               // Los CVs
export const rutaFotosU  = "/fotosu/";            // Las fotos de los usuarios

/** Accedemos a Storage */
export const stg    = firebase.storage();

/** Direccionamos a la carpeta correspondiente */
export const stgCVs      = stg.ref(rutaCVs);
export const stgFotosU   = stg.ref(rutaFotosU);

