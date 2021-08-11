<template>
  <v-dialog
  v-model="dialogVisible"

  max-width="600"

  >
    <template v-slot:activator="{on,attrs}">
      <v-card
      elevation="6"
      class="review-card mx-2"

      >


      <v-row class="header-row mt-3 sticky" justify="center">
        <v-col class="col-auto">
          <h5 class="important-font my-auto primary--text">Question Review</h5>
        </v-col>
      </v-row>



      <v-row
      no-gutters
      v-for="(item, i) in questions"
      :key="i"
      class="pa-3 results-question-row"
      :class="{'results-question-row-odd' : i%2==1}"
      justify="start"
      v-bind="attrs"
      v-on="on"
      @click="selectedQuestionIndex=i"


      >
<!--
        <v-col
        class="col-auto question-col">

        <div
        class="mr-2 number-icon d-inline-flex align-items-baseline justify-content-center"

        >
        <span class="number-text important-font inline-block ">{{i+1}}</span>
      </div>

        <v-icon
        color="primary"
        class="mr-2">
          mdi-numeric-{{i+1}}-circle
        </v-icon>

          <span>{{item.question_text}}</span>
        </v-col>
  -->

        <v-col class="col-auto mr-2">
          <div
          class="number-icon d-inline-flex align-items-baseline justify-content-center">

          <span class="number-text important-font inline-block ">{{i+1}}</span>
        </div>
      </v-col>

        <v-col  class="">
          <span>{{item.question_text}}</span>
        </v-col>

      </v-row>
      </v-card>
    </template>
    <v-card

    class="popup px-5 pt-1 pb-5 rounded"
    v-if="selectedQuestionIndex!== -1">

    <div class="sticky question-header">
    <v-row justify="end">
      <v-col  class="col-auto">
        <v-icon
        @click="dialogVisible=false">
          mdi-close
        </v-icon>
      </v-col>
    </v-row>

      <v-row class="">
        <v-col class="">
          <h3 class="primary--text font-weight-bold">{{currentQuestion.question_text}}</h3>
        </v-col>
      </v-row>

      <v-row class=" background chip-row"
      justify="center">
        <v-col
        v-for="cat in relatedCategories"
        :key="cat"
        class="col-auto">
        <v-chip
        :color="chipCategoryColors[cat]"
        label
        text-color="white">
          <v-icon
          color="white">
            mdi-label
          </v-icon>
          {{capitalize(cat)}}

        </v-chip>
      </v-col>
      </v-row>

      <v-divider></v-divider>
    </div>
      <v-row no-gutters v-if="currentQuestion['answeredCorrectly'].index === -2" class="mb-4" justify="center" align="end">
        <v-col class="col-auto border pa-2 rounded-pill dialog-answer-choice wrong text-h6 d-flex align-items-baseline">
          <v-icon
          class="mr-1 align-self-center"
          color="#a62424">
            mdi-timer
          </v-icon>
          <span class=" timer-wrong-text">Time Limit Reached</span>
        </v-col>
      </v-row>
      <v-row
      class=""
      v-for="(choice,i) in currentQuestion.chosen_choices"
      :key="i"
      justify="center"
      align= "center"
      >
      <v-col class="col-1  mb-3">
        <div class="d-flex justify-center">
        <v-icon
        :color="getIconColor(i)">
          mdi-{{getIcon(i)}}
        </v-icon>
      </div>
      </v-col>
      <v-col
      :class="{'correct' : isCorrectChoice(i), 'wrong' : isSelectedWrong(i) }"
      class="col-9 mb-3 rounded-pill dialog-answer-choice"
      @click="hideDescription(i)">
        <div class="d-flex">
        <v-icon class="mr-3 choice-letter" :color="getIconColor(i)"> mdi-alpha-{{choiceIndexMap[i]}}-circle</v-icon>
        <span class="answer-choice-text my-auto text-h6 font-weight-bold">{{choice.choice_text}}</span>
      </div>
      </v-col>


    </v-row>

    </v-card>

  </v-dialog>
</template>

<script>


export default {
  name: 'QuestionReview',
  props : [
    "questions",


  ],


  data(){

    return {

      dialogVisible : false,
      selectedQuestionIndex : -1,
      showingDescription : false,
      choiceIndexMap : ["a" , "b" , "c" , "d"],
      chipColors : [
        "#97246C",
        "#5ED576",
        "#BD281C",
        "#E67468",
        "#7DAD1F",
        "#4D49C5",
        "#24B28E",
        "#B5733C",
        "#24541C"
      ],
    }

  },

  mounted(){

  },

  computed : {

    allCategories : function(){
      let propNames = Object.keys(this.currentQuestion.categories)

      return propNames.filter(prop =>{
        return typeof this.currentQuestion.categories[prop] === 'boolean'
      })
    },

    chipCategoryColors : function(){
      let map = {}
      this.allCategories.forEach((cat, index) =>{
        map[cat] = this.chipColors[index]
      })
      return map
    },
    currentQuestion : function(){
      return this.questions[this.selectedQuestionIndex]
    },

    relatedCategories : function(){
      console.log(this.chipCategoryColors)
      let related = Object.keys(this.currentQuestion.categories).filter(prop =>{
        return typeof this.currentQuestion.categories[prop] === 'boolean' && this.currentQuestion.categories[prop] ===true
      })

      return related
    },



  },

  methods : {

    capitalize : function(str){
      return str.charAt(0).toUpperCase() + str.slice(1)
    },


    hideDescription : function(i){

      if(this.isCorrectChoice(i)){
        this.showingDescription = !this.showingDescription
      }

    },

    isSelectedWrong : function(i){

      return this.currentQuestion["answeredCorrectly"].val !== true
      && this.currentQuestion["answeredCorrectly"].index === i
    },

    getIcon : function(i){

      if(this.isSelectedWrong(i)){
        return 'close-thick'
      }
      else if(this.isCorrectChoice(i)){
        return 'check-bold'
      }
      else {
        return ''
      }
    },

    getIconColor : function(i){


      if(this.indexOfChoice(this.currentQuestion.chosen_choices, this.currentQuestion.correct_answer) === i){

        return  '#2c6e2f'
      }
      else if(this.currentQuestion["answeredCorrectly"].index === i){
        return '#a62424'
      }

      else {
        return 'primary'
      }
    },


    indexOfChoice : function(arr, choice){

      for(let i = 0; i < arr.length; i++){
        if(arr[i].id === choice.id){
          return i
        }
      }
      return -1

    },


    isCorrectChoice : function(index){
      let correct = this.currentQuestion.chosen_choices[index].choice_text === this.currentQuestion.correct_answer.choice_text
      return correct
    },




  },

  watch : {

  },



}
</script>

<style scoped lang="scss">

.header-row{
  border-bottom: 1px solid lightgray;
  background-color:white;
}
.sticky {

    position: sticky;
    top : 0;
    z-index: 9999;

}
.question-col{
  text-align:justify;
}


div.sticky{
  position: sticky;
  top : 0;
  z-index: 9999;
}

.question-header{
  background-color: inherit;

}


.chip-row{
  margin-left: .1px;
  margin-right : .1px;
}

.review-card{
  border : 2px solid lightgray;
  min-width: 450px;
  max-width: 525px;
  max-height: 262px;
  overflow-y: auto;
  overflow-x: hidden;
}

.results-question-row{
  text-align: left;
}

.results-question-row-odd{
  background-color : #ededed;
}

.results-question-row:hover{
background-color:#adadad;
cursor:pointer;

}

.popup{

  border : 6px solid var(--v-primary-base) !important;
  min-width : 450px;

}

.dialog-answer-choice{

  border :3px solid var(--v-primary-base) !important;
  background-color: white;

  &:hover{
    box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%) !important;
  }

  div .answer-choice-text{
    color : var(--v-primary-base);
    font-size : 20px;
  }
}



.dialog-answer-choice.correct{
background-color: #A5D6A7;
border-color: #2c6e2f  !important;
transition : width 2s;



  div .answer-choice-text{
    color : #2c6e2f;
  }


}

.dialog-answer-choice.wrong{
  background-color: #E57373;
  border-color: #a62424 !important;

  div .answer-choice-text{
    color : #a62424;
  }

}

.correct-description{
  height : 100px;
  width : 100px;
}





.timer-wrong-text{
  font-size: 22px;
  color: #a62424;
}

.number-icon{
  width: 25px;
  height: 25px;
  border-radius:50%;
  color : grey;
  background-color : var(--v-primary-base);
  border : 2px solid var(--v-primary-base);
  span{
    font-size:15px;
    color:white;

  }
}







</style>
