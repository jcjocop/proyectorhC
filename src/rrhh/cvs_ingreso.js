/**
 *   //* cvs_ingreso.js
 *   //* Marzo 12, 2019
 *   //* by Juan Carlos Jocop
 */

/*//? Necesario para los selects */
import VueSingleSelect from "vue-single-select";

/*//? Necesario cargar pdfs */
import pdf from 'vue-pdf'

/*//? Necesario para enviar emails */
import * as emailjs from 'emailjs-com';

/*//? Necesario para el ingreso de  fechas */
import moment from 'moment'
import ingreso from './../components/ingreso.vue'

/*//? Necesario para acceder al almacen (store) */
import { store } from './../store/store.js'
import { mapMutations, mapActions, mapGetters } from 'vuex';

/*//? Necesario para usar los iconos de FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
     library.add(faQuestion)

/*//? Necesario para utilizar el framework Element-UI */
import Vue from 'vue'
import ElementUI from 'element-ui';
     Vue.use(ElementUI);

export default {
     components: {

          pdf: pdf,          
          VueSingleSelect,
          
          'moment': moment,
          'input-date': ingreso,

          fontawesomeicon: FontAwesomeIcon,
     },
     data() {
          return {             
               /*//? -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /*//? Para mostrar u ocultar la pregunta de grabación */
               visibleDel: false, 

               /*//? Para los días */
               // diasControl: [],
               diasaviso: 0, diasrevision: 0,

               /*//? -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /*//? Para búsquedas */
               busqueda: "", busquedaP: "", busquedaC: "", busquedaA: "",

               /*//? -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /*//? Para la carga de foto y cvs */
               selectedFile: "", selectedFoto: "",

               /*//? -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /*//? Datos del participante */
               nombre: "", direccion: "", movil: "", 
               email: "", sexo: "",
               edad: 0, profesion: "", puesto: "", ecivil: "",
               fingreso: new Date(), faviso: new Date(), frevision: new Date(),
               fingresoT: "", favisoT: "", frevisionT: "",
          }
     }, // data()
     created() {
          //! emailjs para jcjocop
          //! emailjs.init("user_pu7rZeT8X5aWJsz1FAvXK");       
          emailjs.init("user_9KwnrXYOSSvTLpiXmmPKn");       // emailjs para angularjsgt          
     }, //* created()
     mounted(){

          this.cargandoValores();
     },
     methods: {
          ...mapMutations(['addbitacora']),
          ...mapActions(['acc_subirFoto']),          
          /* //? ================================================================================================================================== */
          /* //? Limpia valores en los campos usados */
          limpiar() {

               /* //? Variables para la búsqueda */
               this.busqueda= "", this.busquedaP= "", this.busquedaC= "", this.busquedaA= "",

               /* //? Variables para el ingreso */
               this.nombre = ""; this.direccion = ""; this.movil = "";
               this.email = ""; this.sexo = "";
               this.edad = 0, this.profesion = "", this.puesto = "", this.ecivil = "",
               this.selectedFile = ""; this.selectedFoto = "";

               this.agrabar = false;
          }, //* limpiar()
          /* //? Sensitivo para los Selects (vue-singe-select) */
          getCustomDescription(opt) {
               return opt.descripcion
          }, //* getCustomDescription()
          /* //? Texto de ayuda */
          ayudaToast() {

               let hlinea = 'Complete los once (11) datos que se solicitan. ' +
                    'Finalmente seleccione el botón verde para grabar la información. 😊 <i class="material-icons color yellow">check</i> '
               var toastHTML = hlinea;
               M.toast({ html: toastHTML, classes: 'rounded' });
          }, //* ayudaToast

          /* //? ================================================================================================================================== */
          /* //? Necesario para enviar correos */
          correo(elnombre, elpuesto) {

               /*//? Construye la data a enviar en el e-mail */
               let data = {
                    from_name: "Sistema Web Demostraciones",
                    from_email: "angularjsgt@gmail.com",
                    message: "La aplicación es para el puesto de " + elpuesto,
                    subject: "El CV de " + elnombre + " registrado.",
               }; //* data

               /*//? Envía el e-mail */
               emailjs.send("gmail", "pruebasemailjs", data).then(
                    function (Response) {
                         if (Response.text === "OK") {
                              //alert("El correo se ha enviado con éxito");
                         }
                    },
                    function (err) {
                         alert("Ocurrio un problema al enviar  el correo");
                    },
               ); //* emailjs.send()
          },
          /* //? ================================================================================================================================== */
          /* //? Funciones para el PDF */
          password: function (updatePassword, reason) {

               updatePassword(prompt('password is "test"'));
          }, //* password()
          error: function (err) {

               console.log(err);
          }, //* error()

          /* //? ================================================================================================================================== */
          /* //? Funciones para seleccionar un archivo del computador */
          onFileSelected(event) {
               this.selectedFile = event.target.files[0];
          },
          onFileSelectedF(event) {
               this.selectedFoto = event.target.files[0];
          },

          /* //? ================================================================================================================================== */
          datoCompletos(){

               /*//? Obtiene la longitud de cada variable de ingreso para validarlas */
               var llargoNombre = this.nombre.trim().length;
               var llargoDirecc = this.direccion.trim().length;
               var llargoMovil = this.movil.trim().length;
               var llargoEmail = this.email.trim().length;
               var llargoEdad = this.edad;
               var llargoSexo = this.sexo.trim().length;

               var llargoECivil = 0; var llargoPuesto = 0; var llargoProfes = 0;
               if (!(this.puesto.descripcion === undefined)) { llargoECivil = this.ecivil.descripcion.trim().length; }                    
               if (!(this.puesto.descripcion === undefined)) { llargoPuesto = this.puesto.descripcion.trim().length; }                    
               if (!(this.puesto.descripcion === undefined)) { llargoProfes = this.profesion.descripcion.trim().length; }

               var llargocvs = 0; var llargofoto = 0;
               if (!(this.selectedFile.name === undefined)) { llargocvs = this.selectedFile.name.trim().length; }
               if (!(this.selectedFoto.name === undefined)) { llargofoto = this.selectedFoto.name.trim().length; }

               /*//? Asume que los datos están completos */
               let losdatosCompletos = true;

               /*//? Valida las variables de ingreso para permitir la grabación si todas están con información */
               if (llargoNombre === 0 || llargoDirecc === 0 || llargoMovil === 0 ||
                    llargoEmail === 0 || llargoEdad === 0 || llargoSexo === 0 ||
                    llargoECivil === 0 || llargoProfes == 0 || llargoPuesto === 0 ||
                    llargocvs === 0 || llargofoto === 0) {

                    losdatosCompletos=false;

                    var mensajeError = "";
                    if (llargoNombre === 0) { mensajeError = mensajeError + "\nDebe ingresar un nombre." }
                    if (llargoDirecc === 0) { mensajeError = mensajeError + "\nDebe ingresar una dirección." }
                    if (llargoMovil === 0) { mensajeError = mensajeError + "\nDebe ingresar un # celular." }
                    if (llargoEmail === 0) { mensajeError = mensajeError + "\nDebe ingresar un Email." }
                    if (llargoEdad === 0) { mensajeError = mensajeError + "\nDebe ingresar un valor a la Edad." }
                    if (llargoSexo === 0) { mensajeError = mensajeError + "\nDebe seleccionar el sexo." }
                    if (llargoECivil === 0) { mensajeError = mensajeError + "\nDebe seleccionar un Estado Civil." }
                    if (llargoProfes === 0) { mensajeError = mensajeError + "\nDebe ingresar una profesión." }
                    if (llargoPuesto === 0) { mensajeError = mensajeError + "\nDebe ingresar un puesto a aplicar." }
                    if (llargocvs === 0) { mensajeError = mensajeError + "\nDebe seleccionar un CV en formato PDF." }
                    if (llargofoto === 0) { mensajeError = mensajeError + "\nDebe seleccionar una foto." }

                    alert(mensajeError);
               }

               return losdatosCompletos;
          },

          /*//? Necesario para la grabación de un nuevo participante */
          agregaCV() {

               /*//? Activa Bandera para detener el Temporizador que refresca las gráficas */
               store.state.st_grabando = true;

               /*//? Si los datos están completos entonces  */
               let completos = this.datoCompletos();
               if (completos ===true) {

                    /*//? Oculta la pregunta de grabación de datos */
                    this.visibleDel = false;

                    /*//? muestra el spinner (st_mostrarCargador), */
                    store.state.st_mostrarCargador = true;

                    /* //? realiza las transacciones siguientes:
                     * //? 1. Sube la foto a FB-Storage
                     * //? 2. Sube el PDF a FB-Storage
                     * //? 3. Graba los datos del participantes en FB-Database */
                    this.transacciones();

                    /*//? Terminadas las transacciones asincrónicas entonces oculta el spinner y la */
                    this.mostrarCargador = false;

                    /*//? Envía correo al responsable, graba en la bitacora y limpia variables */
                    this.correo(this.nombre,this.puesto.descripcion);
                    this.bitacora();
                    this.limpiar();
               } else {

                    this.visibleDel = false;
               } //* if this.nombre

               /** Desactiva bandera para que el Temporizador vuelva a funcionar */
               store.state.st_grabando = false;
          }, //* agregaCV()
          /*//? Necesario para las transacciones asincrónas */
          transacciones(){

               /*//? Obtiene la fecha del día */
               let fcorta = moment().format('L');

               /*//? Envía una acción */
               this.$store.dispatch('acc_subirFoto', {
                    laruta: store.state.st_rutaFotosU,
                    seleccionado: this.selectedFoto,
                    larutaC: store.state.st_rutaCVs,
                    seleccionadoC: this.selectedFile,
                    nombre: this.nombre,
                    direccion: this.direccion,
                    movil: this.movil,
                    email: this.email,
                    sexo: this.sexo,
                    edad: this.edad,
                    profesion: this.profesion.descripcion,
                    puesto: this.puesto.descripcion,
                    ecivil: this.ecivil.descripcion,
                    seleccionadoF: this.selectedFoto,
                    seleccionadoCV: this.selectedFile,
                    fcorta: fcorta,
                    fingreso: this.fingresoT,
                    frevision: this.frevisionT,
                    faviso: this.favisoT,
                    diasvencidos: 0,
               })
          }, //* transacciones()
  
          /* //? ================================================================================================================================== */
          /* //? Bitácora */
          bitacora(){

               /*//? Obtiene la fecha en español y la hora */
               moment.locale('es');
               let now        = moment().format('L');
               let now2       = moment().format('LTS');
               let laaccion   = "Grabó el CV de "+this.nombre;

               this.$store.commit('addbitacora', {
                    fecha: now, accion: laaccion,
                    hora: now2
               });
          }, //* Bitacora
          /*//? ======================================================================================== */
          cargandoValores() {

               var dummy = store.state.st_dbValoresC.on('value', snapshot =>
                    this.getValores(snapshot.val()));
          },
          getValores(losValores) {

               // this.diasControl = [];
               this.diasaviso      = parseInt(losValores.diasaviso);
               this.diasrevision   = parseInt(losValores.diasrevision);

               moment.locale('es');

               this.fingresoT = moment(this.fingreso).format("DD/MM/YYYY");
               this.frevisionT = moment(this.fingreso).add(this.diasrevision, 'days').calendar();

               var diasDif    = this.diasrevision - this.diasaviso;
               var temporal   = new Date(this.fingreso.setDate(this.fingreso.getDate() + diasDif));
               this.favisoT   = moment(temporal).format("DD/MM/YYYY");
          },    
     } //* methods
} 