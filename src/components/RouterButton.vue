<template>
  <v-btn

      @click="navigate"
    >

    <span>{{this.msg}}</span>

    <slot></slot>

    </v-btn>
</template>

<script>


export default {
  name: 'RouterButton',
  props : [
    "msg",
    "pageParams",
    "pageName",
  ],


  data(){

    return {

    }

  },

  methods : {

    navigate(){
      const n = this.pageName

      if(this.pageParams){
        const requiredParams = this.pageParams

        this.$router.push({name : n, params : {requiredParams}})

      }

      else{
        this.$router.push(n)
      }

    },

  },



}
</script>

<style scoped>






</style>
