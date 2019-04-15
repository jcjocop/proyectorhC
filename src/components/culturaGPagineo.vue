<!-- 
    culturaGPagineo.vue
        Muestra el total de casos registrados.
-->
<template>
    <div>

        <div class="col s9">
            <!--   -->
            Pág. {{npagina}} [{{liminf+1}} - {{limsup}}] | {{mensaje}} encontrados {{lista.length}} 
        </div>
        <div class="col s1">
            <a class="btn waves-effect btn-small waves-light btn-floating secondary-content blue z-depth-5 tooltipped" 
                :class="pagina>1 ? 'pulse': ''" data-position="top" data-tooltip="Página anterior" 
                @click="anterior({lista,fuente})">
                    <i class="material-icons">navigate_before</i>
            </a>
        </div>
        <div class="col s2">
            <a class="btn waves-effect btn-small waves-light btn-floating secondary-content blue z-depth-5 tooltipped" 
                :class="pagina===1 ? 'pulse': ''" 
                data-position="top" data-tooltip="Página siguiente" 
                @click="siguiente({lista,fuente})">
                    <i class="material-icons">navigate_next</i>
            </a>
        </div>                    
    </div>
</template>

<script>
    // import {store}          from './../store'  
    import {mapState, mapMutations} from 'vuex'
    // import {mapGetters}     from 'vuex'
    
    export default {
        props: ['lista','listaf','mensaje','liminf','limsup','npagina','fuente'],
        computed: mapState(['pagina','lini','lfin','limite','esLimiteInf','esLimiteSup']),
        methods: mapMutations(['anterior','siguiente']),   
    }
</script>