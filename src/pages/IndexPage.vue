<template>

    <div id="index-main"  class = "page-container">

    <v-container  v-if="loading" class= "h-100 background" fluid>
      <v-row align="center" class="h-75" justify="center">

        <v-img
          max-width="10%"
          id="loading-icon"
          :src = "require(`@/assets/logo/logo-large.png`)" >
        </v-img>
      </v-row>
      </v-container>


      <v-container v-if="!loading" class="layout-container slanted-background" fluid>


        <v-row no-gutters class = "">

          <v-col class = "">

            <v-row no-gutters class = "justify-content-end" id="index-title-row">
              <v-col class= "col-auto">

                  <h1 id="index-title" class="primary--text important-font title-xl">Bible Trivia</h1>



              </v-col>

            </v-row>

            <v-row id="index-play-button-row" class="justify-content-center" no-gutters>

              <v-col class="col-auto" id="index-play-button-col" >


                <BaseButton
                id="play-btn"
                class="hover-grow"
                nativeType="button"
                tag= "router-link"
                :to="{ name : 'options'}"
                theme="primary"
                size="massive"
                rounded="massive-3">
                <span id="play-btn-text">
                Play
              </span>
                <v-icon id="play-icon"
                      color="secondary"
                      size="95"

                    >
                      mdi-play
                    </v-icon>
              </BaseButton>




              </v-col>


            </v-row>



          </v-col>

          <v-col>

            <v-img
              id="index-xl-logo"
              class="mt-10 ml-8"

              max-width="65%"
              :src = "require(`@/assets/logo/logo-xl.png`)"
            >

          </v-img>
          </v-col>

        </v-row>
      </v-container>



    </div>

</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'IndexPage',
  components: {

    BaseButton,



  },

  data(){
    return {

      loading : true
    }
  },

  mounted(){
    setTimeout(() => {
      this.loading = false
    } ,1000)

  },

  methods : {


},

}
</script>

<style scoped lang="scss">
@import "../assets/styles/pages/index-page.scss";

#play-btn{

border: 5px solid var(--v-primary-base);
  #play-btn-text{
    margin-left:10px;
    margin-right: -15px;
  }

  #play-icon{
    margin-top:-25px;
    margin-bottom: -25px;
    margin-left: -15px;
    margin-right: -15px;
  }

}


#loading-icon {


  animation : pulse 1s infinite;
}






</style>
