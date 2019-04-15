<!-- 
    //* home.vue
    //* Página de inicio.
-->
<template>
    <section>

        <!-- //? Imágen de fondo -->
        <div class="row">

            <!-- //? Mensaje de Bienvenida -->
            <div class="center">
                <b style="font-size:19px" class="center" v-if="$store.state.st_logeado">Bienvenido {{$store.state.st_nusuario}}</b><br>
                <b style="font-size:18px">Características del Sistema</b><br>
                <b>{{$store.state.st_activo ? "" : "(INACTIVO)"}} </b><br>
                <hr>
            </div>

            <div class="col s12">
                <div class="col s1"></div>
                <div class="col s10">

                    <el-carousel :interval="4000" arrow="always" type="card" indicator-position="outside" height="450px">
                        <el-carousel-item class="center">
                            <h5>Multi dispositivos</h5>

                            <!-- <img src="./../assets/imagenes/1.jpg"> -->
                            <img src="/proyectorh/src/assets/imagenes/1.jpg">
                        </el-carousel-item>
                        <el-carousel-item class="center">
                            <span style="font-size:20px">Organizado por módulos</span><br>
                            <span style="font-size:20px">(Menú desplegable)</span>

                            <!-- <img src="./../assets/imagenes/2b.jpg"> -->
                            <img src="/proyectorh/src/assets/imagenes/2b.jpg">
                        </el-carousel-item>
                        <el-carousel-item class="center">
                            <h5>Envía e-mails como notificaciones</h5>

                            <!-- <img src="./../assets/imagenes/3.jpg"> -->
                            <img src="/proyectorh/src/assets/imagenes/3.jpg">
                        </el-carousel-item>
                        <el-carousel-item class="center">
                            <h5>Almacena Fotos y Documentos PDF</h5>

                            <!-- <img src="./../assets/imagenes/4.jpg"> -->
                            <img src="/proyectorh/src/assets/imagenes/4.jpg">
                        </el-carousel-item>
                        <el-carousel-item class="center">
                            <h5>Exportación a Excel</h5>

                            <!-- <img src="./../assets/imagenes/8.jpg"> -->
                            <img src="/proyectorh/src/assets/imagenes/8.jpg">
                        </el-carousel-item>
                        <el-carousel-item class="center">
                            <h5>Galería de Gráficas</h5>

                            <!-- <img src="./../assets/imagenes/5.jpg"> -->
                            <img src="/proyectorh/src/assets/imagenes/5.jpg">
                        </el-carousel-item>
                        <el-carousel-item class="center">
                            <h5>Reside en la nube</h5>

                            <!-- <img src="./../assets/imagenes/6.jpg"> -->
                            <img src="/proyectorh/src/assets/imagenes/6.jpg">
                        </el-carousel-item>
                        <el-carousel-item class="center">
                            <h5>Producido en Guatemala</h5>

                            <!-- <img src="./../assets/imagenes/7.jpg"> -->
                            <img src="/proyectorh/src/assets/imagenes/7.jpg">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="col s1"></div>
            </div> <!-- //* class="col s12" -->
        </div> <!-- //* class="ros" -->
    </section>        
</template>

<!--//? =*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*# -->
<script>
    import Vue from 'vue'
    import ElementUI from 'element-ui';
        Vue.use(ElementUI);

    export default {
        mounted(){
            var elems = document.querySelectorAll('.carousel');
            var instances = M.Carousel.init(elems, { fullWidth: true, indicators: true});

            // var instances = M.Carousel.init(elems, {duration: 300, shift: 100, padding: 100});

        },        
    }
</script>

<!--//? =*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*# -->
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #e1f5fe;
    /* background-color: withe; */
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #e0f2f1;
    /* background-color: withe; */
  }
</style>

