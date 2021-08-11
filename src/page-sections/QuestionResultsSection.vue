<template>

  <v-container class="info-container elevation-4 rounded white">
    <v-row class=" my-5 w-75 mx-auto" no-gutters align="center" justify="space-around">



      <v-col class="col-auto">
        <AnimatedCircle
        type="results"
        :total="resultsData.questions.length"
        :count="totalCorrect"
        :delay="500"
        :interval="50"
        :strokeWidth="8"
         ></AnimatedCircle>

      </v-col>
      <v-col class="col-auto ">

        <AnimatedCircle
        type="grade"
        :strokeWidth="4"
        :gradeLetter="symbol"
        :delay="1000"
        :interval="50"
         ></AnimatedCircle>
      </v-col>

    </v-row>
    <v-row class="" no-gutters align="center" justify="center">
      <v-col class="col-auto  my-5" >
        <QuestionReview  :questions="resultsData.questions" ></QuestionReview>
      </v-col>
    </v-row>

    <v-row no-gutters align="center" justify="center">
      <v-col class="col-auto">

        <BaseButton
        class="rounded-xl hover-grow"
        nativeType="button"
        tag= "router-link"
        :to="{ name : 'options'}"
        theme="secondary"

        size="large">
        <span>
        Retry
      </span>

      </BaseButton>

      </v-col>
    </v-row>



  </v-container>


</template>

<script>
//saves model indices for each category in the categoryList
//emits a list of all indices selected mapped to the category name

import QuestionReview from '@/components/QuestionReview.vue'
import AnimatedCircle from '@/components/AnimatedCircle.vue'
import BaseButton from '@/components/BaseButton.vue'
export default {
  name: 'QuestionResultsSection',
  components : {
    QuestionReview,
    AnimatedCircle,
    BaseButton,

  },

  props : [
    "resultsData",
    "symbol",
    "totalCorrect",
  ],




  data(){

    return {


    }

  },

  mounted(){
    console.log(this.symbol)
  },

  methods : {


  },


  watch : {



  },


  computed : {




}

}
</script>

<style scoped lang="scss">
.info-container{
  width : 600px;
  height : 600px;
  border : 4px solid lightgray !important;

}





</style>
