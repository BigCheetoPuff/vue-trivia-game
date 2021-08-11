<template>
  <v-app-bar color="#203f4f" class="px-5" app>

  <v-btn icon
  class="">
    <v-img
      max-width="50"
      :src="require(`@/assets/logo/logo-medium.png`)">
    </v-img>
  </v-btn>

  <div class="vertical"></div>
  <v-app-bar-title

  class=" ml-3 important-font white--text nav-bar-text">Play</v-app-bar-title>



  </v-app-bar>
</template>

<script>


export default {
  name: 'BrandNavBar',
  props : [


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

.vertical{
  display: inline-block;
  border-left: 1px solid lightgray;
  margin : 20px 20px;
  height : 75%;

}

.nav-bar-text{
  font-size : 24px;

}




</style>
