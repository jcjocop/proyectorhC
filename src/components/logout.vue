<!--
    //* logout.vue
    //* Salida de sesión. 
-->
<template>
    <section>
        <div class="container">
            <div class="row center">
                <transition name="fade-enter">
                    <div class="card blue-grey darken-1">
                        <div class="card-action center">
                            <button class="waves-effect waves-light darken-5 z-depth-3 btn red" 
                                        @click="logOut">
                                <a style="font-size:30px; color:yellow;"><fontawesomeicon icon="person-booth" />
                                    <a style="font-size:15px;color:white;">Salir del Sistema</a>
                                </a>
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
        </div> <!--//* center -->
    </section>
</template>

<!-- ============================================================================= -->
<script>

    import {store}  from './../store/store.js'
    import firebase from 'firebase'

     import {library}              from '@fortawesome/fontawesome-svg-core'
     import { faPersonBooth }        from '@fortawesome/free-solid-svg-icons'
     import {FontAwesomeIcon}      from '@fortawesome/vue-fontawesome'

     library.add(faPersonBooth)

    /* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */    
    export default {

        name: 'logout',
        components: {
            fontawesomeicon: FontAwesomeIcon,
        },
        methods:{
            logOut(){

                const self = this;                
                firebase.auth().signOut()
                    .then(function(){

                        self.$router.push('/');
                    })
                   .then(function () {

                      store.state.st_logeado = false;
                    })                     
                    .catch(function (error) {
                        console.log(error)
                    }) // catch()
            } // logOut()
        }, // methods
    } // export

</script>

<style>
/* always present */
.expand-transition {
  transition: all .3s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
</style>
