<template>

  <v-slide-item
    v-slot="{ active, toggle }"
  >

    <v-card
      :color="active ? 'secondary' : 'grey lighten-1'"
      class="ma-4 border slide-card"
      :class="{active : active}"
      height="150"
      width="150"

      :elevation = "active ? '4' : '0'"
      @click="toggle"
    >


          <v-img

          max-height="90%"
          max-width="150"
          :src = "require(`@/assets/icons/category_imgs/${cardName}.jpg`)"
          >


          </v-img>



          <v-row no-gutters class=""

            justify="center"
            >
            <span
            class=""
            :class="active ? 'white--text' : 'black--text'">

              {{capitalizedName}}
            </span>

          </v-row>

        </v-card>
      </v-slide-item>



</template>

<script>


export default {
  name: 'SlideCard',

  props : [
    "cardName"
  ],




  data(){

    return {



    }

  },

  mounted(){
    console.log(this.cardName)
  },
  computed : {

    capitalizedName : function(){
      return this.cardName.charAt(0).toUpperCase() + this.cardName.slice(1)
    }
  }


}
</script>

<style scoped lang="scss">

.slide-card.active{
  transform: scale(1.05);

}
.slide-card{
transition: transform .2s;

}
.slide-card:hover{

transform: scale(1.05);

}

/*



<v-row
  class="fill-height;"
  align="center"
  justify="center"

>

  <v-scale-transition>

  </v-scale-transition>
</v-row>

*/



</style>
