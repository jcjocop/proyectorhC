<template>
    <section>

        <div class="container">
            <div class="row center">
                <h5 class="center">Cambio de Password</h5>

                <div class="input-field col s12">

                    <input type="password" v-model="passwordact" v-on:keyup.enter="verifPass">
                    <label>Clave de Acceso Actual ?</label>
                </div>
                <div class="input-field col s6">

                    <input type="password" v-model="passwordnew1">
                    <label>Nueva Clave ?</label>
                </div>
                <div class="input-field col s6">

                    <input type="password" v-model="passwordnew2" v-on:keyup.enter="verinPass">
                    <label>Repita Nueva Clave ?</label>
                </div>

                <div class="input-field col s12">
                    <button class="waves-effect waves-light green btn" @click="cambiarClave">Cambiar Clave </button> 
                </div>
            </div> <!-- row center -->
        </div> <!-- container -->
    </section>        
</template>

<script>

    import {store} from './../store/store.js'
    import firebase from 'firebase';

 /* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */    
    export default {

        name: 'login',
        data: function(){

            return{
                passwordact: null, passwordnew1: null, passwordnew2: null,
                bClaveOld: false, bClaveNew: false,
            }
        },
        methods:{
            verifPass(){
                if (this.passwordact.trim() === store.state.st_clave.trim()){

this.bClaveOld= true;
                } else{
                    alert("CLAVE ACTUAL INVALIDA !!! \n"+this.passwordact+"\n"+store.state.st_clave);
                    this.bClaveOld= false;
                    this.passwordact= null
                }
            },
            verinPass(){
                if (this.passwordnew1.trim() === this.passwordnew2.trim()){
                    this.bClaveNew= true;
                } else{
                    alert("NUEVAS CLAVES NO COINCIDEN !!!");
                    this.passwordnew1= null;
                    this.passwordnew2= null
                    this.bClaveNew= false;
                }
            },
            cambiarClave(){

                var confirma = confirm("Seguro de cambiar la clave de acceso para "+store.state.st_nusuario + " ?");
                if (confirma === true){

                    this.verifPass();
                    this.verinPass();

                    const self= this;

                    if (this.bClaveOld && this.bClaveNew){

                        var user=           firebase.auth().currentUser;
                        var newPassword=    this.passwordnew1.trim();

                        user.updatePassword(newPassword)
                        .then(function() {

                            self.$router.push('/');         // Direcciona el ruteo al HOME.                        
                        })
                        .then(function () {

                            var lanuevaRuta= store.state.st_rutaUsuarios + '/' + store.state.st_llave ;
                            var dbelUsuario= store.state.st_db.ref(lanuevaRuta);

                            var elRegUsuario= dbelUsuario.update({

                                clave: self.passwordnew1,
                            })

                            self.passwordact= null; self.passwordnew1= null; self.passwordnew2= null;
                            self.bClaveOld= false; self.bClaveNew= false;
                        })                     
                        .catch(function(error) {
                            // An error happened.
                        });
                    } // * if()
                } // * if(confirma)
            } // * cambiarClave()
        } // * methods
    } // * export
    
</script>