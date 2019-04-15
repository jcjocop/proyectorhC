/*//? Necesario para hacer referencia a store.state.xxx */
import {store} from './store'

export const mutations = {
    /*//? ======================================================================================== */
    ifpin(state,payload){

        state.lini  = payload.a;
        state.lfin  = payload.b;
        state.pagina= payload.c;
        state.esLimiteInf = payload.e;
        state.esLimiteSup = payload.f;
    }, //* ifpin
    ifpout(state,payload){

        if (payload.d === "D"){

            state.Dlini = payload.a; state.Dlfin = payload.b; state.Dpagina   = payload.c;
            state.DesLimiteInf = payload.e;  state.DesLimiteSup = payload.f;
        } else {
            if (payload.d === "M") {
                state.Mlini = payload.a;  state.Mlfin = payload.b;  state.Mpagina = payload.c;
                state.MesLimiteInf = payload.e;  state.MesLimiteSup = payload.f;    
            } else {
                if (payload.d === "C") {
                    state.Clini = payload.a;  state.Clfin = payload.b;  state.Cpagina = payload.c;
                    state.CesLimiteInf = payload.e;  state.CesLimiteSup = payload.f;
                }
                else {
                    if (payload.d === "DAS") {
                        state.DASlini = payload.a;  state.DASlfin = payload.b;  state.DASpagina = payload.c;
                        state.DASesLimiteInf = payload.e;  state.DASesLimiteSup = payload.f;                                
                    } 
                    else {
                        if (payload.d === "DMS") {
                            state.DMSlini = payload.a;  state.DMSlfin = payload.b;  state.DMSpagina = payload.c;
                            state.DMSesLimiteInf = payload.e;  state.DMSesLimiteSup = payload.f;                                
                        } 
                        else {
                            if (payload.d === "TS") {
                                state.TSlini = payload.a;  state.TSlfin = payload.b;  state.TSpagina = payload.c;
                                state.TSesLimiteInf = payload.e;  state.TSesLimiteSup = payload.f;                                
                            } // if (SS)
                            else {
                                if (payload.d === "SS") {
                                    state.SSlini = payload.a;  state.SSlfin = payload.b;  state.SSpagina = payload.c;
                                    state.SSesLimiteInf = payload.e;  state.SSesLimiteSup = payload.f;
                                } // if (SS)
                                else {
                                    if (payload.d === "CG") {
                                        state.CGlini = payload.a;  state.CGlfin = payload.b;  state.CGpagina = payload.c;
                                        state.CGesLimiteInf = payload.e;  state.CGesLimiteSup = payload.f;
                                    } // if (CG)
                                    else {
                                        if (payload.d === "R") {
                                            state.Rlini = payload.a;  state.Rlfin = payload.b;  state.Rpagina = payload.c;
                                            state.ResLimiteInf = payload.e;  state.ResLimiteSup = payload.f;
                                        } // if (SS)                                                                                            
                                    }
                                } // if (SS)
                            } // if(TS)
                        } // if (DMS)
                    } // if (DAS)
                } // IF (C)
            } // if (M)
        } // if (D)                   
    }, //* ifpout()
        alInicio(state,payload){

            state.limite=         payload.lista.length;

            /* Al entrar (in) actualiza los valores de los limites inferior y superios (if) y el de la página (p) de acuero a los valores que
               traen sus contadores correspondientes */            
            if (payload.fuente === "D"){
                store.commit("ifpin",{a: state.Dlini, b: state.Dlfin, c: state.Dpagina,
                                        e: state.DesLimiteInf, f: state.DesLimiteSup});
            } else {
                if (payload.fuente === "M") {
                    store.commit("ifpin",{a: state.Mlini, b: state.Mlfin, c: state.Mpagina,
                                            e: state.MesLimiteInf, f: state.MesLimiteSup});
                }
                else {
                    if (payload.fuente === "C") {
                        store.commit("ifpin",{a: state.Clini, b: state.Clfin, c: state.Cpagina,
                            e: state.CesLimiteInf, f: state.CesLimiteSup});
                    } // if(C)
                    else {
                        if (payload.fuente === "DAS") {
                            store.commit("ifpin",{a: state.DASlini, b: state.DASlfin, c: state.DASpagina,
                                                    e: state.DASesLimiteInf, f: state.DASesLimiteSup});
                        } //if (DAS)
                        else {
                            if (payload.fuente === "DMS") {
                                store.commit("ifpin",{a: state.DMSlini, b: state.DMSlfin, c: state.DMSpagina,
                                                        e: state.DMSesLimiteInf, f: state.DMSesLimiteSup});
                            } //if (DMS)
                            else {
                                if (payload.fuente === "TS") {
                                    store.commit("ifpin",{a: state.TSlini, b: state.TSlfin, c: state.TSpagina,
                                                            e: state.TSesLimiteInf, f: state.TSesLimiteSup});
                                } //if (TS)
                                else {
                                    if (payload.fuente === "SS") {
                                        store.commit("ifpin",{a: state.SSlini, b: state.SSlfin, c: state.SSpagina,
                                                                e: state.SSesLimiteInf, f: state.SSesLimiteSup});
                                    } else {
                                        if (payload.fuente === "CG") {
                                            store.commit("ifpin",{a: state.CGlini, b: state.CGlfin, c: state.CGpagina,
                                                                    e: state.CGesLimiteInf, f: state.CGesLimiteSup});
                                        } // if (CG)
                                        else {
                                            if (payload.fuente === "R") {
                                                store.commit("ifpin",{a: state.Rlini, b: state.Rlfin, c: state.Rpagina,
                                                                        e: state.ResLimiteInf, f: state.ResLimiteSup});
                                            } // if (R)
                                        } // if (CG)
                                    } // if (SS)
                                } // if (TS)
                            } // if (DMS)
                        } // if (DAS)
                    } // if (C)
                } // if (M)
            } // if (D)
        }, //* alInicio()
    anterior(state,payload){

        store.commit("alInicio",payload);

        /* Si no ha llegado al limite inferior, entonces ... (!state.esLimiteInf) */
        if (!state.esLimiteInf) {

            // indicador de llegada al limite superior es falso, porque no está ahí, está en el límite inferior.
            state.esLimiteSup = false; 

            /* Actualiza el límite inferior y superior */
            state.lini = state.lini - state.diferencia;
            state.lfin = state.lfin - state.diferencia;
            
            /** Si el límite inferior es menor que el primer registro (0), entonces */
            if (state.lini < 0) {
                state.lini = 0;
            } 

            /** Si el límite inferior es exáctamente el primer registro (0), entonces */
            if (state.lini === 0) {
                state.esLimiteInf = true;
            } 

            /** Decrementa el conteo de la página */
            state.pagina = state.pagina - 1;

            /* Antes de salir (out) actualiza los valores de los limites inferior y superios (if) y el de la página (p) */
            store.commit("ifpout",{a: state.lini, b: state.lfin, c: state.pagina, 
                                    d: payload.fuente,
                                    e: state.esLimiteInf, f: state.esLimiteSup});
        } // If             
    }, //* anterior()
    siguiente(state,payload){

        store.commit("alInicio",payload);

        /* Si no ha llegado al límite superior, entonces ... (!state.esLimiteSup) */
        if (!state.esLimiteSup) {

            // El indicador de llegar al limite inferior es falso, porque no está ahí, está en el límite superior.
            state.esLimiteInf = false; 

            /* Actualiza el límite inferior y superior */
            state.lini = state.lini + state.diferencia;
            state.lfin = state.lfin + state.diferencia;

            /** Puede ocurrir que en la última vista (bloque), la totalidad de registros que se visualizan es menor a la cantidad que deben visualizarse. 
             *  por ejemplo: la cantidad que debe visualizarse es de 10 filas, pero la totalidad de registros (filas) es 15, entonces en la
             *  primera vista (bloque) si se verán 10 filas, pero en la segunda vista (bloque) solo se verán 5 filas, no 10 ! 
             *  Por lo tanto, el espejo sirve para preservar el valor de la totalidad de registros (que ha quedado en límite superior). Esto ocurre en THEN  */
            var lespejo = ""; var huboespejo = false;

            /** Si el límite superior es mayor a la cantidad de registros, entonces   */
            if (state.lfin > state.limite) {

                lespejo     = state.lfin;   // preserva en el espejo el valor del límite superior y activa (true) el indicador del espejo, y
                huboespejo  = true;         
                state.lfin  = state.limite; // establece como límite superior la cantidad de registros
            }

            /** Si el límite superior (menos 1) es exactamente igual la totalidad de registros (menos 1) entonces */
            if ((state.lfin - 1) === (state.limite - 1)) {

                state.esLimiteSup = true;     // activa (true) el indicador del límite superior para que no hayan más deplazamientos a la derecha, y
                
                /** Si hubo espejo entonces actualiza el límite superior con el valor que dejó en el espejo */
                if (huboespejo) {

                    state.lfin = lespejo;
                } // if (huboespejo)
            } // if()

            /* Incrementa la página visitada */
            state.pagina = state.pagina + 1;        

            /* Antes de salir (out) actualiza los valores de los limites inferior y superios (if) y el de la página (p) */                
            store.commit("ifpout",{a: state.lini, b: state.lfin, c: state.pagina, d: payload.fuente,
                                    e: state.esLimiteInf, f: state.esLimiteSup});
        } // If (!state.esLimiteSup)
    }, //* siguiente()

    /*//? ======================================================================================== */
    subirFoto(state,payload) {

        const larutaFoto = payload[0].lafoto

        store.state.st_urlfoto= larutaFoto;
    }, //* subirFoto

    subirCV(state,payload) {

        const larutaCV = payload[0].elcv;

        store.state.st_urlcv = larutaCV;
    }, //* subirCV
    
    /*//? ======================================================================================== */
    grabarParticipante(state,payload) {

        let lnombre     = payload.nombre;
        let ldireccion  = payload.direccion;
        let lmovil      = payload.movil;
        let lemail      = payload.email;
        let lsexo       = payload.sexo;
        let ledad       = payload.edad;
        let lprofesion  = payload.profesion;
        let lpuesto     = payload.puesto;
        let lecivil     = payload.ecivil;
        let lcfoto      = payload.seleccionadoF.name;
        let lccv        = payload.seleccionadoCV.name;
        let lfcorta     = payload.fcorta;

        let laurlfoto   = store.state.st_urlfoto;
        let laurlcv     = store.state.st_urlcv;

        let lfingreso   = payload.fingreso;
        let lfrevision  = payload.frevision;
        let lfaviso     = payload.faviso;
        let ldiasvencidos = payload.diasvencidos;

        this.ladbCVs = store.state.st_dbCVs;
        this.ladbCVs.push({

            nombre: lnombre,
            direccion: ldireccion,
            movil: lmovil,
            email: lemail,
            sexo: lsexo,
            edad: ledad,
            profesion: lprofesion,
            puesto: lpuesto,
            ecivil: lecivil,
            cfoto: lcfoto,
            ccv: lccv,
            fechac: lfcorta,
            urlfoto: laurlfoto,
            urlcv: laurlcv,
            fingreso: lfingreso,
            frevision: lfrevision,
            faviso: lfaviso,
            diasvencidos: ldiasvencidos,
            aprobado: false,
            aprobadono: false,
            estatus: "en curso",
            estatusbcolor: "green",
            estatusfcolor: "yellow",
        })

        store.state.st_mostrarCargador = false;

        alert("Participante "+lnombre   +" grabado !");
    }, //* grabarParticipante()    
}