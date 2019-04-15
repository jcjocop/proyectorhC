<template>
    <span aria-hidden="true"> 
        <i class="material-icons">{{img}}</i>
    </span>
</template>

<script>

    export default {
        name: 'icon',
        props: ['img'],
    }
</script>