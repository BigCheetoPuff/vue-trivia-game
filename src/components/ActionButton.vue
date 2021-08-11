<template>
  <v-btn

    @click="$emit('click')"
    :class="{'outlined': outlined}"
    >

    <span>{{this.msg}}</span>

    <slot></slot>

    </v-btn>
</template>

<script>


export default {
  name: 'ActionButton',
  props : [
    "msg",
    "outlined"

  ],


  data(){

    return {

    }

  },

  methods : {



  },



}
</script>

<style scoped>


.outlined{

background-color: white !important;
color: var(--v-secondary-base);
border: 2px solid var(--v-secondary-base);


}





</style>
