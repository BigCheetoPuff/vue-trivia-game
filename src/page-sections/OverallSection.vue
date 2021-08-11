<template>





      <SpeechCharacter

      :msg ="msg"
      characterType="moses"
      bubbleType="normal"
      class="">
    </SpeechCharacter>






</template>

<script>
//saves model indices for each category in the categoryList
//emits a list of all indices selected mapped to the category name

import SpeechCharacter from '@/components/SpeechCharacter.vue'

export default {
  name: 'OverallSection',
  components : {
    SpeechCharacter,

  },

  props : [
    "resultsData",
    "msg",
  
  ],




  data(){

    return {




    }

  },

  methods : {


  },


  watch : {



  },


  computed : {











}

}
</script>

<style>





</style>
