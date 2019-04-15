<!--
    //* login.vue
    //* Permite el acceso o inicio de sesión (login) a la aplicación. 
-->
<template>
    <div class="container">
        <div class="row">
            <div class="login">

                <div class="col s3"></div>
                <div class="col s7">
                    <!--//? una única fila para el collapsible -->
                    <ul class="collapsible popout">
                        <!--//? una única columna para el collapsible -->
                        <li>
                            <!--//? título del collapsible -->
                            <cabecera></cabecera>

                            <!--//? cuerpo del collapsible -->
                            <div class="collapsible-body">
                                <figure>
                                    <div class="row">
                                        <!--//? email -->
                                        <div class="input-field col s11">
                                            <i class="material-icons prefix">contact_mail</i>
                                            <input type="email" v-model="email">
                                            <label>Correo electrónico ?</label>
                                        </div>
                                        <div class="col s1"></div>
                                        <!-- //? password 
                                             //? Si se oculta la clave, muestra asteriscos, -->
                                        <div v-if="ocultarClave" class="input-field col s12">
                                            <div class="input-field col s11">
                                                <i class="material-icons prefix">vpn_key</i>
                                                <input type="password" v-model="password">
                                                <label>Clave de Acceso ?</label>
                                            </div>
                                            <div class="input-field col s1">
                                                <a class="btn white tooltipped" 
                                                    data-tooltip="mostrar clave" data-position="bottom" 
                                                    @click="toogleClave">
                                                    <i class="material-icons">visibility_off</i>
                                                </a>
                                            </div>
                                        </div>
                                        <!--//? de lo contrario, muestra la clave cuando se está escribiendo. -->
                                        <div v-else class="input-field col s12">
                                            <div class="input-field col s11">
                                                <i class="material-icons prefix">vpn_key</i>
                                                <input type="text" v-model="password">
                                                <label>Clave de Acceso ?</label>
                                            </div>
                                            <div class="input-field col s1">
                                                <a class="btn white tooltipped" 
                                                    data-tooltip="ocultar clave" data-position="bottom" 
                                                    @click="toogleClave">
                                                    <i class="material-icons">visibility</i>
                                                </a>
                                            </div>
                                        </div>

                                        <!--//? botón de aceptar -->
                                        <div class="input-field col s12 center">                            
                                            <button 
                                                    class="waves-effect waves-light btn-floating darken-5 z-depth-3 green btn center tooltipped" 
                                                    data-tooltip="Acceder" data-position="bottom" 
                                                    @click="signIn">
                                                    <i class="material-icons">check</i> 
                                            </button> 
                                        </div> <!--//* botón aceptar -->
                                    </div> <!--//* row -->
                                </figure>
                                <!--//? spinner para la espera de ingreso a sesión -->
                                <div class="row">
                                    <div class="col s5"></div>
                                    <div class="col s2" v-if="mostrarCargador">
                                        <div class="sk-fading-circle">
                                            <div class="sk-circle1 sk-circle"></div>
                                            <div class="sk-circle2 sk-circle"></div>
                                            <div class="sk-circle3 sk-circle"></div>
                                            <div class="sk-circle4 sk-circle"></div>
                                            <div class="sk-circle5 sk-circle"></div>
                                            <div class="sk-circle6 sk-circle"></div>
                                            <div class="sk-circle7 sk-circle"></div>
                                            <div class="sk-circle8 sk-circle"></div>
                                            <div class="sk-circle9 sk-circle"></div>
                                            <div class="sk-circle10 sk-circle"></div>
                                            <div class="sk-circle11 sk-circle"></div>
                                            <div class="sk-circle12 sk-circle"></div>
                                        </div>
                                    </div>                        
                                    <div class="col s5"></div>
                                </div> <!--//* row -->
                            </div> <!--//* collapsible-body -->
                        </li>
                    </ul>
                </div> <!--//* col s7 -->
            </div> <!--//* login center-->
        </div> <!--//* row -->
    </div> <!--//* container -->
</template>

<style>
    figure{
        /* background: url(2.jpg); */
        background: url(/proyectorh/src/assets/imagenes/2.jpg);
        background-repeat: no-repeat;
        background-position: bottom center; 
        background-attachment:relative; 
    }
</style>

<script>

    import {store} from './../store/store.js'
    import firebase from 'firebase';

    import 'materialize-css/dist/css/materialize.min.css'
    import M from 'materialize-css'

    import cabecera from './login_header.vue'

    /* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */    
    export default {

        name: 'login',
        data: function(){
            return { 
                email: null, password: null,
                ocultarClave: true, mostrarCargador: false,
            }
        },
        components: {
            cabecera
        },
        mounted(){

            var elems = document.querySelectorAll('.collapsible');
            var instances = M.Collapsible.init(elems, {});                
        },        
        methods:{
            toogleClave(){
                this.ocultarClave= ! this.ocultarClave;
            },
            signIn(){

                const self =    this;               //* SELF es para usarlo dentro de las promesas en lugar de THIS
                var elUID=      "";                 //* Preserva la llave del usuario autenticado.
                self.mostrarCargador = true;

                /*//? Verifica si el usuario y clave existen en Firebase */
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(function (user) {

                    self.mostrarCargador= false;
                    elUID       = user.user.uid;    //* Otiene el UID del usuario autenticado
                    self.bdReadUsuarios(elUID);     //* Lee el nodo del usuario para obtener su nombre completo.
                    self.$router.push('/');         //* Direcciona el ruteo al HOME.
                })
                .then(function () {

                    self.laUID  = elUID;            //* Obtiene la UID preservada.

                    /*//? Asigna en las variables globales (las definidas en el store) los valores para: 
                      //?  i) saber si está logeado o no el usuario; ii) la UID del usuario, su email y 
                      //?  su password. */
                    store.state.st_logeado = true;             
                    store.state.st_usuario = self.laUID;
                }) 
                .catch(function(error) {

                    self.mostrarCargador= false;

                    /*//? Obtiene el número y mensaje de error cuando la autenticación es incorrecta */
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    var miMensaje = "NO ERROR";     // Asume que no hay mensaje de error.

                    if (errorCode === "auth/user-not-found"){
                        miMensaje = "Email Invalido. Cuenta NO existe !"
                    } else {
                        if (errorCode === "auth/wrong-password"){
                            miMensaje = "Password Invalido. El password NO existe o No escribió Password !"
                        } else {
                            if (errorCode === "auth/invalid-email") {
                                miMensaje= "Email Invalido. La cuenta de email tiene un formato NO válido."
                            } else{
                                if (errorCode === "auth/operation-not-allowed"){
                                    miMensaje= "El proveedor de inicio de sesión dado está deshabilitado para este proyecto de Firebase.\n"+
                                                "Habilítelo en la consola de Firebase, debajo del inicio de sesión: "+
                                                "pestaña de método de la sección de autenticación.";
                                } // * if
                            } // * else
                        } // * else
                    } // * else

                    /*//? Si Encontró algún error lo muestra !*/
                    if (miMensaje != "NO ERROR"){
                        alert(miMensaje);
                    }
                }); //* catch()
            }, //* signIn()
            getUsuarios(losUsuarios,laLlave){

                /*//? Recorro la info original del nodo para encontrar el nombre del usuario */
                /*//? Prepara el objeto de memoria para obtener la lista de usuarios */
                for (let key in losUsuarios){

                    /*//? Si la ID del usuario en sesión fue encontrada, entonces obtiene el nombre del usuario, 
                      //? los roles que tiene asignados y si está o no activo */
                    if (losUsuarios[key].laid === laLlave){

                        store.state.st_nusuario= losUsuarios[key].nombre;
                        store.state.st_roles=    losUsuarios[key].roles;
                        store.state.st_activo=   losUsuarios[key].activo;
                        store.state.st_admin=    losUsuarios[key].administrador;
                        store.state.st_email=    losUsuarios[key].email;
                        store.state.st_clave=    losUsuarios[key].clave;
                        store.state.st_empresa=  losUsuarios[key].empresa;
                        store.state.st_llave=    key;
                    }; // * if()
                } // * for
            }, // * getUsuarios()
            bdReadUsuarios(laLlave){

                var dummy= store.state.st_dbUsuarios
                            .on( 'value',snapshot=> this.getUsuarios( snapshot.val(), laLlave ) );
            }, // * bdReadUsuarios()         
        }, // * methods
    } // * export

</script>