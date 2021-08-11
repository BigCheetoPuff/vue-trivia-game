<template>

  <v-container fluid fill-height>

      <v-row class="" justify="center" align="end">
        <v-col class= "col-sm-2  col-md-3  mx-8" v-for="(difficultyValue, n)  in difficultyList" :key="difficultyValue">
          <div
          class="difficulty-icon-wrapper mb-4 d-flex align-items-center justify-center"

          >
          <v-img
          :src="require(`@/assets/icons/difficulty_imgs/${iconFileNameList[n]}.png`)"
          class="difficulty-icon"
          :class="{'selected-img' : selectedIndex===n}"
          @click="setDifficulty(n)"
          max-width="80%"
          max-height="100%"
          >

          </v-img>
          </div>
        <h4
        class="diff-label d-inline-block important-font"
        :class="{'selected-label' : selectedIndex===n}">

          {{difficultyList[n]}}

        </h4>

        </v-col>

      </v-row>

      <v-row>
        <v-col class="mt-5">
          <h3></h3>
        </v-col>
      </v-row>

      </v-container>


</template>

<script>

//saves the chosen index in the difficulty list
//emits an object that contains the index(difficulty rank) and the label
export default {
  name: 'DifficultySection',

  props : [
    ""
  ],

//Could just watch computed possible
  watch : {

    difficultyData : {
    immediate : true,


     handler : function(newVal){
      this.$emit("updated-info", newVal);
    }

  }

  },



  data(){

    return {

      difficultyList : ["Easy","Medium","Hard"],
      difficultyColors : ["#50ba32","#FB8C00", "#D62839"],
      selectedIndex : 1,
      iconFileNameList : ["baby","prophet","old-man"]


    }

  },

  methods : {

    setDifficulty : function(i){
      this.selectedIndex = i
    },

  },


  computed : {

    difficultyData : function(){
      return {
        "indexValue" : this.selectedIndex,
        "labelValue" : this.difficultyList[this.selectedIndex]
      }
    }

  },


}
</script>

<style scoped>

.diff-label{
  color: var(--v-primary-base);
  letter-spacing: 1.5px;

}

.selected-label{
  color: var(--v-secondary-base);
  border-bottom: 1px solid var(--v-secondary-base);
}

.difficulty-icon-wrapper:hover + .diff-label:not(.selected-label){

border-bottom: 1px solid var(--v-primary-base);

}

.difficulty-icon{

transition: transform .4s ease-in-out;

}

.difficulty-icon-wrapper{
  max-width:250px;
  max-height:250px;
}

.difficulty-icon:hover{

cursor:pointer;
}

.selected-img {

animation: float 2s ease-in-out infinite;
filter: drop-shadow(5px 5px 5px #222);

}

@keyframes float {
	0% {

		transform: translatey(0px);
	}
	50% {

		transform: translatey(-20px);
	}
	100% {

		transform: translatey(0px);
	}
}







</style>
