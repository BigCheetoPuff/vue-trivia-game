
import Timer from '@/components/Timer.vue'
import ArrayUtils from '@/component-mixins/ArrayUtils.js'
import AnimatedCircle from '@/components/AnimatedCircle.vue'
import BaseButton from '@/components/BaseButton.vue'
export default {
  name: 'PlayPage',
  mixins : [ArrayUtils],
  components : {
    Timer,
    BaseButton,
    AnimatedCircle
  },




  data(){

    return {
      quizData : undefined,
      displayData : undefined,
      questionIndex : -1,
      paused : false,
      quizState : {
        loading : true,
        errored : false,
        finished : false,
      },

      selectedChoiceIndex : -1,
      timerEnabled : true,
      initialTimerVal : undefined,
      wrongAudio : new Audio(require('@/assets/audio/effects/wrong.mp3')),
      correctAudio : new Audio(require('@/assets/audio/effects/correct.mp3')),
      timerAudio : new Audio(require('@/assets/audio/effects/alarm.mp3')),
      difficultyTimeMap : [35,25,15],



    }

  },

  beforeMount(){
    window.addEventListener("beforeunload", this.preventRefresh)
    this.$once("hook:beforeDestroy", ()=>{
      window.removeEventListener("beforeunload" , this.preventRefresh)
    })
  },

  beforeRouteEnter(to,from,next){

    if(typeof to.params.requiredParams !== 'undefined'){
      console.log("fetching data from API")
      next(vm => {
        vm.quizData = to.params.requiredParams
        vm.fetchData()

      })

    }

    else if(localStorage.getItem("displayData") !== null &&
     localStorage.getItem("questionIndex") !== null &&
      localStorage.getItem("timerVal") !== null){
      next(vm =>{

        console.log("fetching data from local Storage")

        try{
          vm.displayData = JSON.parse(localStorage.getItem("displayData"))
          vm.questionIndex = JSON.parse(localStorage.getItem("questionIndex"))

          vm.initialTimerVal = JSON.parse(localStorage.getItem("timerVal"))
          vm.quizData = JSON.parse(localStorage.getItem("quizData"))
          vm.quizState.loading = false
          vm.paused = true

        }catch(e){
          console.log("error retrieving local storage")

        }

      })

  }


  else{
    next(false)
  }

},



  beforeRouteLeave(to,from,next){

    if(typeof to.params.requiredParams === "undefined"){
     if(!window.confirm("Are you sure you want to exit the quiz?")){
       return
     }
     else{
       this.emptyLocalStorage()
       next()
     }
   }

   else{
     this.emptyLocalStorage()
     next()
   }
  },

  computed : {


    hasChosen : function(){
      return this.selectedChoiceIndex !== -1
    },



    hasLoadedData : function(){
      return this.displayData && !this.quizState.loading && this.displayData.length > 0
    },

    currentQuestion : function(){
      return this.displayData[this.questionIndex]
    }
  },


  watch : {

    'quizState.finished' : function(newVal){

      if(this.timerEnabled){
      this.$refs.timer.stop()
    }

      if (newVal === true){

        this.$router.push({name : "results" , params : {"requiredParams" : {
          questions : this.displayData,
          categoryList : this.quizData.categoryList

        }}})
    }
  }

},








  methods : {

    updateLocalStorage : function(initial=false){
      const savedData = JSON.stringify(this.displayData)
      const savedQuestionIndex = JSON.stringify(this.questionIndex)
      localStorage.setItem('displayData', savedData)
      localStorage.setItem('questionIndex', savedQuestionIndex)
      if(initial){
        localStorage.setItem("quizData", JSON.stringify(this.quizData))
      }
    },

    emptyLocalStorage : function(){
      localStorage.removeItem("displayData")
      localStorage.removeItem("questionIndex")
      localStorage.removeItem("quizData")
      localStorage.removeItem("timerVal")

    },

    preventRefresh : function(event){
        localStorage.setItem("timerVal", this.$refs.timer.current)
        event.preventDefault()
        event.returnValue = ""
    },




    createQueryParams : function(dataObject){
      let paramObject = {}

      let categories = dataObject.categoryList
      categories.forEach(function(cat){
        paramObject[cat] = true
      })

      let timePeriod = dataObject.timePeriods.length > 1 ? "*" : dataObject.timePeriods[0]


      paramObject.time_period = timePeriod
      //paramObject.difficulty = dataObject.difficulty.indexValue + 1

      return paramObject

    },



    fetchData : function(){

      const URL = 'http://localhost:8000/questions/'
      console.log(this.quizData)

      this.$axios
      .get(URL, {
        params : this.createQueryParams(this.quizData)
      })
      .then(response => {

      this.displayData = this.shuffleArray(response.data.question_batch)
      this.initialTimerVal = this.difficultyTimeMap[this.quizData.difficulty.indexValue]
      console.log("timer val from" + this.initialTimerVal)
      console.log(this.displayData)
    })
      .catch(error => {
        console.log(error)
        this.quizState.loading = true
      })
      .finally(() => {
        this.quizState.loading = false
        this.questionIndex = 0

        this.updateLocalStorage(true)
      })



    },



    proceed : function(){


      this.selectedChoiceIndex = -1
      if(this.questionIndex < this.displayData.length-1){

      this.questionIndex+=1
      this.updateLocalStorage()


      if(this.timerEnabled){

        this.$refs.timer.reset()

      }

      }
      else{
        this.quizState.finished = true
        console.log("finished")
      }
    },



    isSelectedWrong : function(i){
      return this.selectedChoiceIndex===i && !this.isCorrectChoice(i)
    },

    isSelectedCorrectly : function(i){
      return this.selectedChoiceIndex===i && this.isCorrectChoice(i)
    },

    isTimerRingVal : function(i){
      console.log(this.selectedChoiceIndex===i && i === -2)
      return this.selectedChoiceIndex===i && i === -2
    },






    isCorrectChoice : function(index){
      let correct = this.currentQuestion.chosen_choices[index].choice_text === this.currentQuestion.correct_answer.choice_text
      return correct
    },

    checkAnswer : function(i = -2){
      console.log(":c")
      this.selectedChoiceIndex = i;
      let timerRang = i === -2
      let chosenAudio = null
      if(!timerRang && this.isCorrectChoice(this.selectedChoiceIndex)){

          this.currentQuestion["answeredCorrectly"] = { val :true, index : i}
          chosenAudio = this.correctAudio

             }

        else {
            this.currentQuestion["answeredCorrectly"] = { val :false, index : i}
            if(timerRang){
              chosenAudio = this.timerAudio
            }
            else{
              chosenAudio = this.wrongAudio
            }

        }

        chosenAudio.play()
        chosenAudio.onended = () =>{

          this.proceed()
        }




    },





  }



}
