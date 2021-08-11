<template>

    <div id="options-main" class="page-container">
      <v-container class="layout-container slanted-background" fluid>

          <v-row id="title-row" class="" no-gutters>
            <v-col>
              <h1 class="important-font title-lg primary--text">First, Choose Some Options</h1>
            </v-col>
          </v-row>



          <v-row id="tab-row" justify="center">
            <v-col class="col-auto">

              <v-tabs class="tab-bar"
              background-color="transparent"
              v-model="tabIndex"
              >

                <v-tab
                  v-for="(tab,i) in tabList"
                  :key="i"
                  :id="`tab-${i}`"
                  @click="checkTransitionDir(i)"
                >
                  {{tab.labelName}}
                  <v-icon
                    v-if="isTabDone(tab)"
                    small
                    color="green">
                    mdi-check-bold
                  </v-icon>
                </v-tab>
              </v-tabs>

            </v-col>
          </v-row>

          <v-container class="tab-group-view-wrapper">

                  <transition :name="`slide-${transitionDir}`" mode="out-in">

                    <keep-alive>
                      <component :is="currentTabComponent" @updated-info="updateOptionData"></component>
                    </keep-alive>

                  </transition>


        </v-container>


        <v-row id="btn-row" class="mt-6  w-25 mx-auto rounded-xl pa-5 elevation-3" no-gutters justify="center" align="center">


          <v-col class="">

            <BaseButton
            @click="previousTab"
            class=""
            size="large"
            theme="secondary"
            rounded="large-3"
            outlined
            :disabled="isFirstTab"
            >
            Back
          </BaseButton>

          </v-col>



          <v-col class="">

            <BaseButton
            v-if="!isFinalTab"
            @click="nextTab"
            size="large"
            theme="secondary"
            class=""
            rounded="large-3"
            >
            Next
          </BaseButton>


            <BaseButton
            v-else
            size="large"
            theme="secondary"
            :disabled="!allTabsDone"
            class="mx-5"
            type="router-link"
            nativeType="button"
            tag="router-link"
            rounded="large-3"
            @click="window.alert(optionParams)"
            :to= "{ name : 'play' , params : {requiredParams : optionParams} }"
            >
            Finish
          </BaseButton>






          </v-col>

        </v-row>

      </v-container>

    </div>




</template>

<script>

//import OptionStepper from '@/components/OptionStepper.vue'
import DifficultySection from '@/page-sections/DifficultySection.vue'
import TimePeriodSection from '@/page-sections/TimePeriodSection.vue'
import CategorySection from '@/page-sections/CategorySection.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'OptionsPage',
  components : {

    BaseButton,
    TimePeriodSection,
    DifficultySection,
    CategorySection,


  },




  data(){

    return {


      tabIndex : 0,
      transitionDir : "left",

      tabList : [
        {
          paramName : "difficulty",
          componentName : "difficulty-section",
          labelName : "Difficulty",
          modelValue : {}

        },
        {
          paramName : "timePeriods",
          componentName : "time-period-section",
          labelName : "Time Period",
          modelValue : []

        },

        {
          paramName : "categoryList",
          componentName : "category-section",
          labelName : "Category",
          modelValue : []

        }
      ],


      }


  },


  watch : {


  },

  computed : {

  allTabsDone : function(){
    let isDone = true
    this.tabList.forEach((tab) => {
      if(!this.isTabDone(tab)){

        isDone = false
      }
    })
    console.log(isDone)
    return isDone


  },


  optionParams : function(){
    let params = {}
    this.tabList.forEach((item) => {
      params[item.paramName] = item.modelValue
    })

    return params

  },

  tabLabelList : function(){
    return this.tabList.map(obj =>{
      obj.labelName
    })

  },

  isFirstTab : function(){
    return this.currentTabComponent == this.tabList[0].componentName
  },

  isFinalTab : function(){
    return this.currentTabComponent == this.tabList[this.tabList.length-1].componentName
  },

  currentTab : function(){
    return this.tabList[this.tabIndex]
  },

  currentTabComponent : function(){
  return this.tabList[this.tabIndex].componentName
},

currentButtonComponent : function(){
  if(this.isFinalTab){
    return "router-button";
  }
  else{
    return "action-button";
  }
},

currentButtonProps : function(){

  if(this.isFinalTab){

        return {
        msg : "Finish",
        pageName : "play",
        pageParams : this.optionParams,


    }
  }

    else{
    return {
      msg : "Next",

  }

}


}

  },



  methods : {

    isTabDone : function(tab){



      if(tab.labelName === "Time Period" || tab.labelName === "Category"){
        return tab.modelValue.length !== 0
      }
      else if(tab.labelName === "Difficulty"){
        return true
      }

      else {
        return false
      }




    },

    isViewCompleted : function(tab){
      if(tab === "difficulty-section"){
        return this.optionParams.difficulty !== null
      }

      else if(tab === "time-period-section"){
        return this.optionParams.timePeriods.length !==null

      }
      else if(tab === "category-section"){
        return this.optionParams.categoryList.length !== null
      }
      else return false

    },

    updateOptionData : function(newData){

      this.currentTab.modelValue = newData
      console.log(newData)


    },

    nextTab : function(){

      if(this.tabIndex + 1 < this.tabLabelList.length)
        this.tabIndex++;
    },

    previousTab : function(){


      if(this.tabIndex - 1 >= 0)
        this.tabIndex--;
    },

    checkTransitionDir : function(index){

      if(index < this.tabIndex){
        this.transitionDir = "right";
      }

      else if(index > this.tabIndex){
        this.transitionDir = "left";
      }
    }
  }



}

</script>

<style scoped lang="scss">
@import '../assets/styles/pages/option-page.scss';

#btn-row{

  background-color:lightgrey;
  border: 3px solid white !important;
}

.tab-group-view{

  background-color: transparent;
}

.tab-group-view-wrapper{
  height: 350px;
}

.divider{
  border-left: 2px solid var(--v-primary-base);
}


</style>
