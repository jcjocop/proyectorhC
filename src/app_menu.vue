<!-- 
     //* app_menu.vue
     //* Marzo 2019
     //* By Juan Carlos Jocop
-->
<template>
     <div class="row">
          <div class="right">
               <!--//? HAMBURGUESA -->
               <a style="font-weight:bold; cursor: pointer; padding-left: 1px; top:10px; right:10px"
                    data-target="slide-out" 
                    class="waves-effect waves-light btn btn-floating blue sidenav-trigger tooltipped" data-tooltip="Módulos" data-position="left">
                    <i class="material-icons" style="font-size: 34px;">menu</i> 
               </a>

               <!--//? MENU DESPLEGABLE -->
               <ul id="slide-out" class="sidenav" style="width:330px;">
                    <!--//? Imágen -->
                    <li style="padding: 1px 1px;">
                         <div class="user-view">
                              <div class="background">
                                   <!-- <img src="rh2.jpg"> -->
                                   <img src="/proyectorh/src/assets/imagenes/rh2.jpg">
                              </div>
                              <br><br><br>
                         </div>
                         <hr>
                    </li>
                    <!--//? Home -->
                    <li>
                         <router-link v-show="$store.state.st_logeado" to="/" tag="li" exact> 
                              <a> <i class="material-icons">home</i>Inicio </a>
                         </router-link>
                    </li>
                    <!--//? Reclutamiento -->
                    <li>
                         <router-link v-show="$store.state.st_logeado" to="/cv" tag="li" exact> 
                              <a> <i class="material-icons">contact_mail</i>Reclutamiento </a>
                         </router-link>
                    </li>
                    <!--//? Selección -->
                    <li>
                         <router-link v-show="$store.state.st_logeado" to="/" tag="li" exact> 
                              <a> <i class="material-icons">playlist_add_check</i>Selección de Personal </a>
                         </router-link>
                    </li>
                    <li><hr></li>
                    <!--//? Nómina -->
                    <li>
                         <router-link v-show="$store.state.st_logeado" to="/nomina" tag="li" exact> 
                              <!-- <a> <i class="material-icons">supervisor_account</i>Nómina </a> -->
                              <a style="font-size:22px;"><fontawesomeicon icon="sitemap" />
                                   <a style="font-size:14px;color:black; padding:1.7em">Nómina</a>
                              </a>
                         </router-link>
                    </li>
                    <!--//? Evaluación del desempeño -->
                    <li>
                         <router-link v-show="$store.state.st_logeado" to="/desempeno" tag="li" exact> 
                              <!-- <a> <i class="material-icons">assignment</i>Evaluación del Desempeño </a> -->
                              <a style="font-size:22px;"><fontawesomeicon icon="handshake" />
                                   <a style="font-size:14px;color:black; padding:1.7em">Evaluación del Desempeño</a>
                              </a>
                         </router-link>
                    </li>
                    <!--//? Clima Organizacional -->
                    <li>
                         <router-link v-show="$store.state.st_logeado" to="/climaorg" tag="li" exact> 
                              <!-- <a> <i class="material-icons">cloud_off</i>Clima Organizacional </a> -->
                              <a style="font-size:22px;"><fontawesomeicon icon="cloud-sun" />
                                   <a style="font-size:14px;color:black; padding:1.7em">Clima Organizacional</a>
                              </a>
                         </router-link>
                    </li>
                    <!--//? Control de Asistencia -->
                    <li>
                         <router-link v-show="$store.state.st_logeado" to="/asistencia" tag="li" exact> 
                              <a> <i class="material-icons">access_time</i>Control de Asistencia </a>
                         </router-link>
                    </li>
                    <li><hr></li>
                    <!--//? Activos Fijos -->
                    <li>
                         <router-link v-show="$store.state.st_logeado" to="/activosfijos" tag="li" exact> 
                              <a> <i class="material-icons">airport_shuttle</i>Activos Fijos </a>
                         </router-link>
                    </li>
                    <li><hr></li>
                    <!--//? Nuevos Catálogos -->
                    <li>
                         <router-link v-show="$store.state.st_logeado" to="/catalogos" tag="li" exact> 
                              <!-- <a> <i class="material-icons">chrome_reader_mode</i>Catálogos</a> -->
                              <a style="font-size:22px;"><fontawesomeicon icon="window-restore" />
                                   <a style="font-size:14px;color:black; padding:1.7em">Catálogos</a>
                              </a>
                         </router-link>
                    </li>
              </ul> <!--//* créditos slide -->
          </div> <!--//* class=right -->
     </div>
</template>

<script>

     import {library}              from '@fortawesome/fontawesome-svg-core'
     import { faCloudSun, faHandshake, faWindowRestore, faSitemap  }        from '@fortawesome/free-solid-svg-icons'
     import {FontAwesomeIcon}      from '@fortawesome/vue-fontawesome'

     library.add(faCloudSun, faHandshake, faWindowRestore, faSitemap)

     export default {
          name: "menuslide",
          components: {
               fontawesomeicon: FontAwesomeIcon,
          },
     }
</script>
