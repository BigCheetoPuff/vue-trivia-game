<template>
  <div id="results-main" class = "page-container">

  <v-container class="layout-container slanted-background" v-if="resultsData" fluid>

  <v-row justify="space-around" no-gutters align="end" class=" mt-8">
    <v-col class="col-auto ">
      <OverallSection :msg="endingMessage.msg"  :resultsData ="resultsData"></OverallSection>
    </v-col>

    <v-col class="col-auto ">
      <QuestionResultsSection :symbol="endingMessage.symbol" :totalCorrect="totalCorrect" :resultsData="resultsData"></QuestionResultsSection>
    </v-col>


  </v-row>





<!--
    <v-row class="tab-row" justify="center" align="center">
      <v-col class="col-auto">

        <v-tabs class="tab-bar"
        background-color="transparent"
        v-model="tabIndex"
        >

          <v-tab
            v-for="(tabName,i) in tabList"
            :key="i"
            :id="`tab-${i}`"
          >
            {{tabName}}
          </v-tab>
        </v-tabs>

      </v-col>
    </v-row>
-->

  </v-container>
  </div>
</template>

<script>
import QuestionResultsSection from '@/page-sections/QuestionResultsSection.vue'
import OverallSection from '@/page-sections/OverallSection.vue'

export default {
  name: 'ResultsPage',
  components: {
    OverallSection,
    QuestionResultsSection,





  },

  props : [




  ],

  data() {

    return {

      msgMap : [
        {
          val : 90,
          label : "Excellent work, your knowledge is vast",
          symbol : "A"
        },
        {
          val : 80,
          label : "Well done, good and faithful servant",
          symbol : "B"

        },
        {
          val : 70,
          label : "Good job, I am pleased",
          symbol : "C"
        },

        {
          val : 60,
          label : "There is room for improvement",
          symbol : "D"
        },
        {
          val : 50,
          label : "Maybe the difficulty is too high",
          symbol : "F"
        },
        {
          val : 40,
          label : "Ah, I see you may be struggling"

        },
         {
          val : 30,
          label : "Ok, I will not judge you"

        },
        {
          val : 20,
          label : "Do not give up just yet"

        },
         {
          val : 10,
          label : ":("

        },

         {
          val : 0,
          label : "I'd watch out for lightning"

        }
      ],


      tabIndex : 0,
      tabList : [
        {

          componentName : "overall-section",
          labelName : "Overall",


        },
        {

          componentName : "question-results-section",
          labelName : "Results",


        },

      ],

      resultsData : null,
      graphColors : ["#f87979", "#9683d6", "#4a8e72","#b59696","#f36162","#6a1549","#77500a","#62ce4f","#1bb2bb","#1e769c"],

      hexColorList : ['#CD6155','#E74C3C','#9B59B6','#7D3C98','#2471A3','#17A589','#138D75','#229954','#28B463','#F1C40F','#E67E22','#D35400','#34495E'],



    }


  },

  watch : {


  },

  beforeMount(){
    window.addEventListener("beforeunload", this.persistResultsData)
    this.$once("hook:beforeDestroy", ()=>{
      window.removeEventListener("beforeunload" , this.persistResultsData)
    })
  },

  mounted(){
    this.persistResultsData()
    console.log(this.endingMessage)

  },


  beforeRouteEnter(to,from,next){

    if(typeof to.params.requiredParams !== 'undefined'){
      console.log("fetching data from play page")
      next(vm => {
        vm.resultsData = to.params.requiredParams


      })

    }

    else if(localStorage.getItem("resultsData") !== "null"){

      next(vm =>{

      try{
        vm.resultsData = JSON.parse(localStorage.getItem("resultsData"))

      } catch(e){

        localStorage.removeItem("resultsData")
      }


  })

}

  else{

    if(from.name !== "results"){
    next(false)
  }
    else {
      next("index")
    }
  }


},



  beforeRouteLeave(to,from,next){
    localStorage.removeItem("resultsData")
    next()

  },


  methods : {

    get_cat_data : function(){

      const cat_names = this.resultsData.categoryList
      const results = this.resultsData
      let categoryData = {
      }

        cat_names.forEach(function(cat) {
          categoryData[cat] = {}
          categoryData[cat]["numCorrect"] = 0
          categoryData[cat]["numWrong"] = 0

          let related_questions = results.questions.filter(function(question) {
            return question.categories[cat]===true
          })

          console.log(related_questions)

          related_questions.forEach(function(question) {
            if(question["answeredCorrectly"].val === true){
              categoryData[cat]["numCorrect"] +=1
            }
            else{
              categoryData[cat]["numWrong"] +=1
            }
          })

        categoryData[cat]["percentageCorrect"] = (categoryData[cat]["numCorrect"]/ (categoryData[cat]["numCorrect"] +  categoryData[cat]["numWrong"])) * 100
        categoryData[cat]["percentageWrong"] = (categoryData[cat]["numWrong"]/ (categoryData[cat]["numCorrect"] +  categoryData[cat]["numWrong"])) * 100

        })


          return categoryData


        },


    getGraphConfig : function(){
      if(this.resultsData === null)
        return {}

      else{
      let cat_names = this.resultsData.categoryList
      let catData = this.get_cat_data()

      let correctCount = cat_names.map(name =>{
        catData[name]["numCorrect"]
      })

      let wrongCount = cat_names.map(name =>{
        catData[name]["numWrong"]
      })
      let correctPercents = cat_names.map(name =>{
        catData[name]["percentageCorrect"]
      })

      let wrongPercents = cat_names.map(name =>{
        catData[name]["percentageWrong"]
      })
      console.log(correctCount)
      console.log(wrongCount)
      console.log(correctPercents)
      console.log(wrongPercents)
      console.log(catData)

        return {
          type : 'bar',
          data : {
            labels : cat_names,
            datasets : [{
              label : "# Answered Correct",
              data : correctCount,
              backgroundColor : this.hexColorList.slice(0,this.resultsData.categoryList.length),

            },

            {
              label : "% Answered Correct",
              data : correctPercents,
              backgroundColor : this.hexColorList.slice(0,this.resultsData.categoryList.length),

            },

            {
              label : "# Answered Wrong",
              data : wrongCount,
              backgroundColor : this.hexColorList.slice(0,this.resultsData.categoryList.length),

            },

            {
              label : "% Answered Wrong",
              data : wrongPercents,
              backgroundColor : this.hexColorList.slice(0,this.resultsData.categoryList.length),

            },



          ]
          },
          options : {
            scales : {
              y : {
                beginAtZero : true
              }
            }
          }
        }
      }
    },

    persistResultsData : function(){
      if(typeof this.resultsData === 'undefined'){
        console.error("Couldn't save to local storage")
      }

      else{
        const savedData = JSON.stringify(this.resultsData)
        localStorage.setItem('resultsData', savedData)
      }
    },





    getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },

      capitalizeArr : function(arr){
        return arr.map(item => item.charAt(0).toUpperCase() + item.slice(1))

      },


},

computed : {


  totalCorrect : function(){
    let total = 0;
    for(let i =0; i < this.resultsData.questions.length; i++){
      if(this.resultsData.questions[i]["answeredCorrectly"].val === true){
        total++;
      }
    }
    console.log(total)
    return total;
  },




  endingMessage : function(){

    let data = {
      symbol : "",
      msg : ""
    }



    let percent = (this.totalCorrect / this.resultsData.questions.length) * 100
    console.log(percent)
    let scoreVals = this.msgMap.map(function(obj) {
      return obj.val
    })

    for(let i = 0; i < scoreVals.length; i++){
      console.log(scoreVals[i])
      if(percent >= scoreVals[i]){

      let hasSymbol = this.msgMap[i].symbol !== undefined
      console.log(hasSymbol)
        if(hasSymbol){
        data.symbol = this.msgMap[i].symbol
          }
        else {
          data.symbol = "F"
        }

        if(percent >= (scoreVals[i] + 5)){
          data.symbol +="+"
        }
        else{
          data.symbol += "-"
        }
        data.msg = this.msgMap[i].label
        console.log(data)
        return data
      }
    }
    return   {symbol : "F-" , msg : this.msgMap[this.msgMap.length-1].label}

},

  currentTabComponent : function(){
    console.log(this.currentTab.componentName)
    return this.currentTab.componentName
  },



  currentTab : function(){
    return this.tabList[this.tabIndex]
  },

  getViewProps : function(){
    return {
      questionData : this.resultsData.questions,
      categoryData : this.get_cat_data()
    }
  },



  catGraphOptions : function() {


       return {
        title : {
          display : true,
          text : "Categories Answered Correctly",
        },
        scales : {

          xAxes : [{
            title : {
              display : true,
              text : "yeet"
            }
          }],

          yAxes: [{
            scaleLabel : {
              display : true,
              labelString : "Hi"
            },
            type: 'linear',
            ticks: {
                max: 100,
                min : 0,
                stepSize: 10
            }

          }],
        }
      }





  },

  catGraphData : function(correctAnswers = true, asPercentage = true){

    let dataList = []
    let propName = ""
    if(correctAnswers){
      if(asPercentage)
        propName = "percentageCorrect"
      else
        propName = "numCorrect"

      }
    else{
      if(asPercentage)
        propName = "percentageWrong"
      else
        propName = "numWrong"
    }

    const cat_names = this.resultsData.categoryList

    cat_names.forEach(cat =>{
      dataList.push(this.get_cat_data[cat][propName])
    })


    console.log(dataList)

    return {
      labels: this.capitalizeArr(this.resultsData.categoryList),
        datasets: [
        {
          label: 'Category',
          backgroundColor: this.graphColors.slice(0,this.resultsData.categoryList.length),
          data: dataList,
          minBarLength : 2,
        }
      ]
    }
  }

}

}
</script>

<style scoped lang="scss">





.ending-message {
  letter-spacing: 1px;
}

</style>
