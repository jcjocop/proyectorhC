/**
 * bitacora.js
 *        Script de cvs_consultas.vue
 */

/** Para las fechas */
import moment            from 'moment'
import ingreso           from './../components/ingreso.vue'

import { store }         from './../store/store.js'
import { mapMutations }  from 'vuex';

import { library }       from '@fortawesome/fontawesome-svg-core'
import { faFilePdf, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFilePdf, faQuestion)

export default {
     components: {
          'moment': moment,
          'input-date': ingreso,
          fontawesomeicon: FontAwesomeIcon,
     },
     data() {
          return {

               /** Para búsquedas */
               busqueda: "", busquedaF: "", busquedaA: "",

               /* Por default el bloque de filas es mostrado de 5 en 5. De ahí que el primer bloque vaya de 0 a 5 */
               lini: 0, lfin: 5,
               pagina: 1,              // Contador del pagineo en la tabla
               diferencia: 1,          // diferencia = lfin - lini
               cantVista: 5,           // varibles para controlar el pagineo en la vista. (l)imite (ini)cial, (l)imite (fin)al,
               LlegoLimiteSup: false,  // Indicador si se ha llegado a la última página
               LLegoLimiteInf: true,   // Indicador si se ha llegado a la primera página
               limite: 5,              // la (diferencia) entre lfin y lini, si llegó a la última o 1a. página y cantidad de registros.
               veces: 1,
          }
     },
     /** Para usar pdfvuer descomentarizar esta linea de codigo y el watch */
     mounted() {

          this.$store.commit('cargandoBitacora');
     },
     computed: {
          filtrarlaBitacora: function () {

               return store.state.st_bitacora.filter((bita, index) => {

                    /* Preserva el índice las tareas recién instanciadas ya que cuando se realiza una búsqueda y se quiere 
                       eliminar una tarea, el índice cambia y borra otra tarea. [ Ver función eliminar() ] en tareas.vue.  */
                    bita.codigo = index;
                    if (bita.usuario.toUpperCase().includes(this.busqueda.toUpperCase()) &&
                         bita.fecha.toUpperCase().includes(this.busquedaF.toUpperCase()) &&
                         bita.accion.toUpperCase().includes(this.busquedaA.toUpperCase())
                    )
                    {
                         return bita
                    }
               })
          }, // filtarTareas()
     },
     methods: {
          ...mapMutations(['cargandoBitacora']),

          /* ================================================================================================================================== */
          /** Miscelaneos */
          CargaValores(){

               if (this.veces===1){

                    console.log("[cargaValores]");
                    console.log("bitacora ? ", store.state.st_bitacora);
                    console.log("lfin ? ", this.lfin);
                    this.diferencia = this.lfin - this.lini;
                    this.lfin = this.cantVista;

                    // this.limite = store.state.st_bitacora.length;
                    this.limite = this.filtrarlaBitacora.length;
                    console.log("limite ? ", this.limite, "; lini ? ", this.lini, "; lfin ? ", this.lfin, "; diferencia ? ", this.diferencia, "; Cantvista ? ", this.cantVista);

                    this.veces= this.veces + 1;
               }
          },
          ayudaToast() {

               let hlinea = 'Busque una transacción por usuario, fecha y/o acción'
               var toastHTML = hlinea;
               M.toast({ html: toastHTML, classes: 'rounded' });
          },
          limpiarBusquedas() {
               this.busqueda = ""; this.busquedaF = ""; this.busquedaA = "";
          },
          senalarRegistro(currRegistro){

               /* Refresca todos los registros con el color default: black  */
               var i = 0;
               for (i = 0; i < store.state.st_bitacora.length; i++) {

                    store.state.st_bitacora[i].color = "#FFFFFF";
               }
               /* Cambia el color del registro concurrente (#FFDD00)*/
               currRegistro.color = "#0DA8E5"; // verde: 21960C; celeste: 13C3FF; verde claro: 12FF88; verde obs: 0EBF66, azul obscuro: 0932E5
          },
          /* ================================================================================================================================== */
          /** Pagineo */
          incremento() {

               /** El incremento de filas siempre será de 5 en 5 hasta 20 */
               this.cantVista += 5;
               if (this.cantVista > 20) { // Si el conteo sobrepasa los 20, deja como cantidad maxima 20 y no permite más desplazamiento.
                    this.cantVista = 20;
                    return "";
               }

               /** Para cada incremento en la vista, el límite inferior siempre sera 0 y el superior la cantidad de filas a mostrar. La página empezará en 1 */
               this.lini = 0; this.lfin = this.cantVista; this.pagina = 1;
               console.log("CantVista ? ",this.cantVista,"lini ? ",this.lini,"; lfin ? ",this.lfin,"; pagina ? ",this.pagina)

               /** Si la cantidad de filas a ver es mayor o igual a la cantidad de registros, entonces */
               /** store.state.st_bitacora.length */
               if (this.cantVista >= this.limite) {

                    this.LlegoLimiteSup = true; // el indicador de haber llegado al límite superior se activará (true)
                    this.LLegoLimiteInf = true; // el indicador de haber llegado al límite inferior también se activará, puesto que todos los registros son mostrados y no debe haber desplazamiento para ningún lado
                    /** Si la cantidad de filas a ver es exactamente igual a la cantidad de registros, entonces  */
                    if (this.cantVista === this.limite) {
                         this.cantVista = this.limite;
                    } // la cantidad de filas a mostrar será la totalidad de registros
               } else {
                    this.LlegoLimiteSup = false;
               } // el indicador de haber llegado al límite inferior se inactivará (false) puesto que puede haber "regreso"

               /** La diferencia siempre será el límite superior - límite inferior */
               this.diferencia = this.lfin - this.lini;
          }, // incremento()
          decremento() {

               /** El decremento de filas siempre será de 5 en 5 hasta 0 */
               this.cantVista -= 5;
               if (this.cantVista < 5) { // Si el conteo es menor que las primeros 5 filas, deja como cantidad maxima 5 y no permite más desplazamiento a la izquierda
                    this.cantVista = 5;
                    return "";
               }

               /** Para cada decremento en la vista, el límite inferior siempre sera 0 y el superior la cantidad de filas a mostrar. La página empezará en 1 */
               this.lini = 0;
               this.lfin = this.cantVista;
               this.pagina = 1;

               /** Si la cantidad de filas a ver es mayor o igual a la cantidad de registros, entonces */
               if (this.cantVista < this.limite) {

                    this.LlegoLimiteSup = false; // el indicador de haber llegado al límite superior se activará (true)
                    this.LLegoLimiteInf = false; // el indicador de haber llegado al límite inferior también se activará, puesto que todos los registros son mostrados y no debe haber desplazamiento para ningún lado

                    /** La diferencia siempre será el límite superior - límite inferior */
                    this.diferencia = this.lfin - this.lini;
               } else {
                    this.LlegoLimiteSup = false;
                    this.LLegoLimiteInf = true;
               }
          }, // decremento()   
          siguiente() {

               this.CargaValores();

               console.log("[siguiente], ", "limite ? ", this.limite, "; Llegó al límite superior ? ", this.LlegoLimiteSup);
               /* Si no ha llegado al límite superior, entonces ... */
               if (!this.LlegoLimiteSup) {

                    this.LLegoLimiteInf = false; // El indicador de llegar al limite inferior es falso, porque no está ahí.

                    console.log("* diferencia ? ",this.diferencia);
                    /* Actualiza el límite inferior y superior */
                    this.lini = this.lini + this.diferencia;
                    this.lfin = this.lfin + this.diferencia;

                    /** Puede ocurrir que en la última vista (bloque), la totalidad de registros que se visualizan es menor a la cantidad que deben visualizarse. 
                     *  por ejemplo: la cantidad que debe visualizarse es de 10 filas, pero la totalidad de registros (filas) es 15, entonces en la
                     *  primera vista (bloque) si se verán 10 filas, pero en la segunda vista (bloque) solo se verán 5 filas, no 10 ! 
                     *  Por lo tanto, el espejo sirve para preservar el valor de la totalidad de registros (que ha quedado en límite superior). Esto ocurre en THEN
                     */
                    var lespejo = ""; var huboespejo = false;

                    console.log("* lini ? ", this.lini, "; lfin ? ", this.lfin, "; lfin > limite ? ",this.limite,"; fin > limite ? ",this.lfin > this.limite);
                    /** Si el límite superior es mayor a la cantidad de registros, entonces   */
                    if (this.lfin > this.limite) {
                         lespejo = this.lfin;
                         huboespejo = true; // preserva en el espejo el valor del límite superior y activa (true) el indicador del espejo, y
                         this.lfin = this.limite; // establece como límite superior la cantidad de registros
                    }
                    console.log("lfin ? ",this.lfin);
                    console.log("** (fin-1) === (limite-1) ? ", (this.lfin - 1) === (this.limite - 1));
                    /** Si el límite superior (menos 1) es exactamente igual la totalidad de registros (menos 1) entonces */
                    if ((this.lfin - 1) === (this.limite - 1)) {
                         this.LlegoLimiteSup = true; // activa (true) el indicador del límite superior para que no hayan más deplazamientos a la derecha, y
                         /** Si hubo espejo entonces actualiza el límite superior con el valor que dejó en el espejo */
                         if (huboespejo) {
                              this.lfin = lespejo;
                         }
                    }

                    /* Incrementa la página visitada */
                    this.pagina = this.pagina + 1;
                    console.log("** página ? ",this.pagina);
               } // If
          }, // siguiente()
          anterior() {

               /* Si no ha llegado al limite inferior, entonces ... */
               if (!this.LLegoLimiteInf) {

                    this.LlegoLimiteSup = false; // indicador de llegada al limite superior es falso, porque no está ahí.

                    /* Actualiza el límite inferior y superior */
                    this.lini = this.lini - this.diferencia;
                    this.lfin = this.lfin - this.diferencia;

                    /** Si el límite inferior es menor que el primer registro (0), entonces */
                    if (this.lini < 0) {
                         this.lini = 0;
                    } // establece como límite inferior el primer registro (0)

                    /** Si el límite inferior es exáctamente el primer registro (0), entonces */
                    if (this.lini === 0) {
                         this.LLegoLimiteInf = true;
                    } // el indicador del límite inferior se activa (true) para que ya no hayan más desplazamientos a la izquierda

                    /** Decrementa el conteo de la página */
                    this.pagina = this.pagina - 1;
               } // If 
          }, // anterior()     
     } // methods
} //