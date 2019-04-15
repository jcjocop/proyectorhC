<!--    //* App.Vue
        //* Marzo 2019
        //* by Juan Carlos Jocop
        //* Componente principal. Primero en ser renderizado desde main.js
        //* Muestra el menú de opciones    
-->
<template>
    <div id="app" >
        <!--//? ================================================================================================================================================ -->
        <!--//? NAVBAR-DROPDOWNS (SUB-MENUS) -->
        <!--//? ================================================================================================================================================ -->

        <!--//? Usuario: Cambiar Clave de Acceso y Salida -->
        <ul id="dropdown1" class="dropdown-content">
            <!--//? CONFIGURACION -->
            <li>
                <router-link v-show="$store.state.st_logeado" to="/configuracion" tag="li" exact>
                    <la dataTooltip="Configuración" dataPosition="top" icono="cog"></la>
                </router-link>
            </li>                        
            <!--//? BITACORA -->
            <li>
                <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/bitacora" tag="li" exact>
                    <la dataTooltip="Bitácora" dataPosition="left" icono="folder-open"></la>
                </router-link>
            </li>
            <!--//? CAMBIAR CLAVE -->
            <li>
                <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/chgpass" tag="li" exact>
                    <la dataTooltip="Cambiar Clave" dataPosition="left" icono="key"></la>
                </router-link>
            </li>
            <!--//? SALIDA -->
            <li>
                <router-link v-show="$store.state.st_logeado" to="/logout" tag="li" exact> 
                    <la dataTooltip="Salida" dataPosition="left" icono="person-booth"></la>
                </router-link>
            </li>        
        </ul>
        <!--//? Catalogos: geograficos y salud; profesiones, puestos y estados civiles  -->
        <ul id="dropdown2" class="dropdown-content">
            <li>
                <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/geoguate"  tag="li" exact>  
                    <la dataTooltip="Geográficos y de Salud" dataPosition="buttom" icono="globe"></la>
                </router-link>
            </li>
            <li>
                <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/otroscat"  tag="li" exact>
                    <la dataTooltip="Otros" dataPosition="buttom" icono="copy"></la>
                </router-link>
            </li>
            <li>
                <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/profesiones"  tag="li" exact>
                    <la dataTooltip="Profesiones" dataPosition="buttom" icono="user-graduate"></la>
                </router-link>
            </li>
            <li>
                <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/puestos"  tag="li" exact>
                    <la dataTooltip="Puestos" dataPosition="buttom" icono="address-card"></la>
                </router-link>
            </li>
            <li>
                <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/ecivil"  tag="li" exact>
                    <la dataTooltip="Estados Civiles" dataPosition="buttom" icono="book-reader"></la>                    
                </router-link>
            </li>
        </ul>

        <!--//? NAVBAR (TOP MENU) -->
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper blue lighten-1">

                    <!--//? Lado Izquierdo: Logotipo e Icono de la Hamburguesa (Inicio)  -->
                    <a class="brand-logo"><img src="/proyectorh/src/assets/imagenes/milogo.png" alt=""></a>
                    <a data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>

                    <!--//? Lado Derecho: Icono de la casita (Home), CVs, Catálogos y de [ Acceso (Login) ] [ Salida (cambio de clave y salida) ] -->
                    <ul id="nav-mobile" class="right hide-on-med-and-down">

                        <!--//? HOME (inicio) -->
                        <li> <router-link v-show="$store.state.st_logeado" to="/" tag="li" exact> 
                                <a class="tooltipped withe" 
                                    data-tooltip="Home" 
                                    data-position="left">
                                    <i class="material-icons">home</i> 
                                </a>
                            </router-link>
                        </li>
                        <!--//? LOGIN (ingreso) -->
                        <li> <router-link v-show="!$store.state.st_logeado" 
                                            to="/login" tag="li" 
                                            exact 
                                            class="active"> 
                                            <a class="tooltipped" data-tooltip="Login" data-position="top">
                                                <i class="material-icons">https</i> 
                                            </a>
                            </router-link>
                        </li>

                        <!--//? CATALOGOS: Dropdown Trigger -->
                        <li v-show="$store.state.st_logeado">
                            <a data-target="dropdown2" 
                                class="dropdown-trigger tooltipped" 
                                data-tooltip="Catálogos" 
                                data-position="rigth"> 
                                <i class="material-icons">content_paste arrow_drop_down</i>
                            </a>
                        </li>
                        <!--//? SALIDA: Dropdown Trigger -->
                        <li v-show="$store.state.st_logeado">
                            <a data-target="dropdown1" 
                                class="dropdown-trigger tooltipped" 
                                :data-tooltip="$store.state.st_nusuario" 
                                data-position="bottom"> 
                                <i class="material-icons">person arrow_drop_down</i>
                            </a>
                        </li>
                    </ul>
                </div> <!--//* nav-wrapper blue lighten-1 -->
            </nav>
        </div> <!--//* navbar-fixed -->
        
        <!--//? ================================================================================================================================================ -->
        <!--//? PARA TABLETS O MOVIL  -->
        <!--//? ================================================================================================================================================ -->
        <ul class="sidenav" id="mobile-demo">
            <!--//? HOME (inicio) -->
            <li><router-link v-show="$store.state.st_logeado" to="/" tag="li" exact>                
                                <la dataTooltip="Inicio" dataPosition="left" icono="home"></la>
                 </router-link>
            </li>
            <!--//? LOGIN (ingreso) -->
            <li><router-link v-show="!$store.state.st_logeado" to="/login" tag="li" exact class="active"> 
                    <la dataTooltip="Acceso" dataPosition="top" icono="user-lock"></la>
                </router-link>
            </li>
            <!--//? CATALOGOS: Dropdown Trigger -->
            <li v-show="$store.state.st_logeado">
                <a data-target="dropdown4" 
                    class="dropdown-trigger tooltipped" 
                    data-tooltip="Catalogos" 
                    data-position="right"> 
                    <i class="material-icons">content_paste arrow_drop_down</i>
                </a>
            </li>
            <!--//? SALIDA: Dropdown Trigger -->
            <li v-show="$store.state.st_logeado">
                <a data-target="dropdown3" 
                    class="dropdown-trigger tooltipped" 
                    :data-tooltip="$store.state.st_nusuario" 
                    data-position="bottom"> 
                    <i class="material-icons">person arrow_drop_down</i>
                </a>
            </li>
                <!--//? SUB-MENUS -->
                <!--//? Usuario: Cambiar Clave de Acceso y Salida -->
                <div>
                    <div style="height: 18px;"></div>
                    <ul id="dropdown3" class="dropdown-content">
                        <!--//? CONFIGURACION -->
                        <li>
                            <router-link v-show="$store.state.st_logeado" to="/configuracion" tag="li" exact>
                                <la dataTooltip="Configuración" dataPosition="top" icono="cog"></la>
                            </router-link>
                        </li>                        
                        <!--//? BITACORA -->
                        <li>
                            <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/bitacora" tag="li" exact>
                                <la dataTooltip="Bitácora" dataPosition="right" icono="folder-open"></la>
                            </router-link>
                        </li>
                        <!--//? CAMBIAR CLAVE -->
                        <li>
                            <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/chgpass" tag="li" exact>
                                <la dataTooltip="Cambiar Clave" dataPosition="right" icono="key"></la>
                            </router-link>
                        </li>
                        <!--//? SALIDA -->
                        <li>
                            <router-link v-show="$store.state.st_logeado" to="/logout" tag="li" exact> 
                                <la dataTooltip="Salida" dataPosition="right" icono="person-booth"></la>
                            </router-link>
                        </li>        
                    </ul>
                </div>

                <!--//? Catalogos: geograficos y salud; profesiones, puestos y estados civiles  -->
                <div>
                    <div style="height: 18px;"></div>
                    <ul id="dropdown4" class="dropdown-content">
                        <li>
                            <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/geoguate"  tag="li" exact>  
                                <la dataTooltip="Geográficos y de Salud" dataPosition="buttom" icono="globe"></la>
                            </router-link>
                        </li>
                        <li>
                            <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/otroscat"  tag="li" exact>
                                <la dataTooltip="Otros" dataPosition="buttom" icono="copy"></la>
                            </router-link>
                        </li>
                        <li>
                            <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/profesiones"  tag="li" exact>
                                <la dataTooltip="Profesiones" dataPosition="buttom" icono="user-graduate"></la>
                            </router-link>                            

                        </li>
                        <li>
                            <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/puestos"  tag="li" exact>
                                <la dataTooltip="Puestos" dataPosition="buttom" icono="address-card"></la>
                            </router-link>                            
                        </li>
                        <li>
                            <router-link v-show="$store.state.st_logeado && $store.state.st_activo" to="/ecivil"  tag="li" exact>
                                <la dataTooltip="Estados Civiles" dataPosition="buttom" icono="book-reader"></la>
                            </router-link>                            
                        </li>
                    </ul>
                </div>            
        </ul>

        <!--//? MENU (HAMBURGUESA) -->
        <header v-show="$store.state.st_logeado">
            <menusis></menusis>
        </header>

        <!--//? Parecido a ng-view. Es un componente de vue-router -->
        <router-view></router-view>   

        <!--//? CREDITOS -->
        <footer>
            <creditos></creditos>
        </footer>
    </div> <!--//* id="app" -->
</template>

<script src="./App.js"></script>

