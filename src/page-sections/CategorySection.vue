<template>

<v-container fill-height fluid>
  <v-sheet
  class="mx-auto my-auto"
  elevation="8"
  max-width="850"
  rounded="xl"


  >
    <v-slide-group
      v-model="model"
      class="pa-4 my-4"
      multiple
      show-arrows
    >


      <SlideCard
      v-for="(name,index) in categoryNames"
      :key= "index"
      :cardName="name"
      ></SlideCard>

    </v-slide-group>
  </v-sheet>
</v-container>


</template>

<script>
//saves model indices for each category in the categoryList
//emits a list of all indices selected mapped to the category name
import SlideCard from '@/components/SlideCard.vue'


export default {
  name: 'CategorySection',
  components : {

    SlideCard,
  },

  props : [
    ""
  ],




  data(){

    return {

      categoryNames : ["jesus","doctrine","history","prophecy","genealogy","gospel","miracle"],
      model : [],
      selectedOptions : null,

    }

  },

  methods : {


  },


  watch : {

    catList : {
      immediate : true,

      handler : function(newVal){
      this.$emit("updated-info", newVal);
    }

  }

  },


  computed : {

    catList : function(){
      return this.model.map(i =>{
        return this.categoryNames[i]
      })
    },

  },


}
</script>

<style scoped>





</style>
