<!-- 
     //* app_creditos.vue
     //* Marzo 2019
     //* By Juan Carlos Jocop
-->
<template>     
     <div class="row">
            <div class="right">
                <a style="font-weight:bold; cursor: pointer;" 
                   data-target="slide-out2" 
                   class="waves-effect waves-light btn btn-floating gray sidenav-trigger tooltipped" data-tooltip="Créditos" data-position="left">
                   <i class="material-icons" style="font-size: 33px;">fingerprint</i>
                </a>
                <ul id="slide-out2" class="sidenav">
                    <br>
                    <li>
                        <div class="user-view">
                            <div class="background center">
                                <img src="/proyectorh/src/assets/imagenes/logoempresa.jpg">
                            </div>
                            <br><br><br>
                        </div>
                        <div class="center">                     
                            <a>Aplicación de Demostración</a>
                        </div>
                    </li>
                    <li><div class="divider"></div></li>
                    <li>
                        <div class="user-view">
                            <div class="center">
                                <b class="waves-effect" style="font-size:14px">&copy;2019. All rights reserved.</b>
                                <b class="waves-effect">jcjocop@gmail.com</b><br>
                            </div>
                        </div>
                    </li>           
                    <li>
                        <div class="user-view">
                            <div class="background center">
                                <img src="/proyectorh/src/assets/imagenes/milogomedium.jpg">
                            </div>
                            <br>
                        </div>
                    </li>                    
                </ul> <!--//* créditos slide -->    
            </div>
            <div class="right">
                <b style="font-size:11px">&copy; 2019. All rights reserved.</b> 
            </div>
     </div>
</template>
