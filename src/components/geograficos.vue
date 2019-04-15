<template id="geograficos">
    <section>

        <!-- Floating Botton: Acciones complementarias (border: 3px solid #73AD21;)
            <div class="fixed-action-btn  direction-down" style="position: absolute; top:125px; right:960px; height:350px;">  -->
        <div class="fixed-action-btn  direction-bottom" style="position: fixed; top:10px; left:250px; right:1220px; bottom:180px;">
            <a class="btn-floating btn-medium blue darken-4"> <i class="large material-icons">more_vert</i>  </a>
            <ul>
                <li>  <a @click="ayuda" class="btn waves-effect btn-floating blue darken-2 tooltipped" data-position="rigth" data-tooltip="Ayuda" style="opacity: 0; transform: scale(0.4) translateY(0px) translateX(40px);">
                        <i class="material-icons">accessibility</i>  </a>  </li>
                <li>  <a @click="quitarFiltros" class="btn waves-effect btn-floating blue darken-2 tooltipped" data-position="top" data-tooltip="Quitar filtros." style="opacity: 0; transform: scale(0.4) translateY(0px) translateX(40px);">
                        <i class="material-icons">refresh</i>  </a>  </li>
            </ul>
        </div> <!-- Floating Botton: Acciones complementarias -->

        <div class="container row">
            <transition name="fade">
                <section v-if="mostrar" class="center">
                    <b >AYUDA</b><br>
                    <p>Todo catálogo tiene las siguientes partes.</p>
                    <img src="/proyectorh/src/assets/imagenes/ayudacata1.jpg">
                </section>
            </transition>         
        </div>

        <div class="row">
            <div class="col s4">            
                <deptos></deptos>
            </div>
            <div class="col s4">
                <das></das>            
            </div>
            <div class="col s4">
                <tipoS></tipoS>
            </div>
        </div>
        <div class="row">
            <div class="col s4">
                <munis></munis>                
            </div>
            <div class="col s4">
                <dms></dms>
            </div>
            <div class="col s4">
                <ss></ss>
            </div>
        </div>        
    </section>
</template>

<script src='./geograficos.js'></script>
