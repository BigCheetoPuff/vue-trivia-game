<template>

    <div id="play-main" v-if="hasLoadedData && !paused" class="page-container">

      <v-container class="layout-container slanted-background align-items-start" fluid fill-height>

        <v-row
        class="my-auto"
        no-gutters

        >

        <v-col class="col-2 in-quiz-tab">
          <v-row class="flex-column" no-gutters
          align="center"

          >
            <v-col class="col-auto mt-6">
              <AnimatedCircle
                v-if="timerEnabled"
                type="timer"
                :interval="1000"
                :size="140"
                :total="difficultyTimeMap[quizData.difficulty.indexValue]"
                :initial="initialTimerVal"
                @timer-ring="checkAnswer"
                ref="timer"
                class=" mx-5"
                ></AnimatedCircle>
            </v-col>
          </v-row>

        </v-col>

          <v-col class="col-8">

        <v-card class= "rounded-xl my-auto" elevation="15"  id = "question-card">

          <v-row
          justify="center"
          class="mt-8 "
          no-gutters

          >
            <v-col class="px-3 mx-3 ">
              <h1 class="white--text question-header ">{{currentQuestion.question_text}}</h1>
            </v-col>
          </v-row>


            <div class="choice-layout-wrapper mt-5">
              <v-row
              no-gutters
              justify="end"
              class="mb-5">
              <v-col class="col-6 ">
                <v-row
                 no-gutters
                 class ="my-5"
                 v-for="(choice,i) in currentQuestion.chosen_choices"
                 :key="i"
                 align="center">

                   <v-col
                   class="choice-col rounded-pill py-2 px-8 elevation-3"
                   :class="{wrong : isSelectedWrong(i),
                    correct : isSelectedCorrectly(i),
                    disabled : hasChosen }"

                   @click="checkAnswer(i)"
                   >

                    <h3 class="my-auto">{{choice.choice_text}}</h3>

                  </v-col>


                </v-row>

              </v-col>
              <v-col class="col-3" align-self="start">
                <v-img
                class="question-mark"
                :src = "require('@/assets/icons/question-mark_imgs/questionmark1.png')"
                max-width="350">
                </v-img>
              </v-col>
              </v-row>

          </div>


        </v-card>

        <transition name="fade">
        <div v-if="hasChosen" class="answer-result-overlay border rounded-xl">

          <v-img
          v-if="isTimerRingVal(selectedChoiceIndex) ||  isSelectedWrong(selectedChoiceIndex)"
          class="answer-img wrong-answer-icon"
          :src="require('@/assets/icons/answer_imgs/wrong-symbol.png')"
          max-width="50%"
          >
        </v-img>

          <v-img
          v-else
          class="answer-img correct-answer-icon"
          :src="require('@/assets/icons/answer_imgs/correct-symbol.png')"
          max-width="50%"
          >
        </v-img>


        </div>

      </transition>

      </v-col>
    </v-row>


      </v-container>

  </div>

  <div v-else-if="hasLoadedData && paused"
  class="page-container">
      <v-container class="layout-container slanted-background align-items-start" fluid fill-height>
        <v-row justify="center" align="center" class=" my-auto">
          <v-col  class=" col-auto">
            <BaseButton
            class="hover-grow resume-button elevation-15"
            rounded="massive-3"
            theme="secondary"
            size="massive"
            @click="paused=false">
            Resume Question?
            </BaseButton>
          </v-col>
        </v-row>

      </v-container>

</div>

</template>

<script src="../assets/js/play-page.js">


</script>

<style scoped lang="scss">

.question-header{

  font-family:'Nunito', sans-serif;
}

#score {
  letter-spacing: 0;
  font-size: 64px;
}

.choice-layout-wrapper {
  width: 100%;
  max-height: 80%;

}



#question-card {
  width : 100%;
  height : 100%;

  border : 4px solid white;
  border-top-width : 12px;
  background-color: var(--v-primary-base);

}

.in-quiz-tab{


}



.choice-col{
  color: var(--v-primary-base);
  background-color : white;
  border : 3px solid var(--v-primary-base);
  transition : transform .2s;
  transition : shake
}

.choice-col:hover {
  cursor : pointer;
}
.choice-col:hover:not(.selected):not(.disabled) {
  background-color: var(--v-secondary-base);
  border-color : white;
  color: white;
  transform : scale(1.1);

}

.choice-col.disabled{
  cursor: default;
}



.wrong{
  background-color : var(--v-secondary-base);
  color : white;
  border-color : white;
  animation : .7s slow-shake;
}

.correct {
  background-color : green;
  color : white;
  border-color : white;


}

@keyframes slow-shake {

  from {
    transform : rotateZ(0deg);
  }

  25%{
    transform : rotateZ(15deg);
  }

  35%{
      transform : rotateZ(15deg);
  }



  75%{
      transform : rotateZ(-15deg);
  }

  85%{
      transform : rotateZ(-15deg);
  }



  to{

    transform : rotateZ(0deg);

  }

}

@keyframes shake-slow{

from {
  transform : rotateZ(-20deg);
}

7%{
  transform : rotateZ(-5deg);
}

14%{
  transform : rotateZ(-25deg);
}

20%{
    transform : rotateZ(-20deg);
}



to{

  transform : rotateZ(-20deg);

}


}

.question-mark{
  transform : rotateZ(-30deg);
  animation : 5s shake-slow infinite;
}



.answer-result-overlay{
  position : absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0,0,0,0.7); /*dim the background*/
}

.wrong-answer-icon{
  position : relative;
  margin-left: auto;
  margin-right : auto;
  //top: -50px;
}

.correct-answer-icon{
  position : relative;
  //top : -100px;
  margin-left: auto;
  margin-right: 200px;
}

.resume-button{

font-family: 'Nunito', sans-serif;

border: 7px solid white !important;
}



</style>
