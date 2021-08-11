<template>
  <v-app id="main">


    <v-main>
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  components : {


  },

  data: () => ({
    //
  }),
};
</script>


<style lang="scss">

.v-application {
   font-family: '$body-font-family', sans-serif;
    h, h1, h2, h3, h4, h5, h6 { // To pin point specific classes of some components
       font-family: 'Nunito', sans-serif;
    }
 }



#main {

/*
  //GRADIENT
  background: hsla(239, 94%, 14%, 1);

  background: linear-gradient(90deg, hsla(239, 94%, 14%, 0.7) 0%, hsla(190, 68%, 50%, 1) 100%);

  background: -moz-linear-gradient(90deg, hsla(239, 94%, 14%, 0.7) 0%, hsla(190, 68%, 50%, 1) 100%);

  background: -webkit-linear-gradient(90deg, hsla(239, 94%, 14%, 0.7) 0%, hsla(190, 68%, 50%, 1) 100%);

  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#020344", endColorstr="#28B8D5", GradientType=1 );
*/



  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //background: var(--v-background-base);
  //margin-top: 60px;

}

</style>
