<template>
  <div class="speech-char-container d-flex flex-column">


      <transition appear name="fade">
        <v-img
        v-if="bubbleType !== 'none'"
        class="bubble align-self-end mb-n6"
        :class="['bubble-' + bubbleType]"

        :src="require(`@/assets/icons/talking-character-imgs/${getFileByType(bubbleType)}`)"
        max-width="250">

          <div class="bubble-text-box pa-2 d-flex align-center justify-center">
            <span class="font-weight-bold">{{msg}}</span>
          </div>
        </v-img>
      </transition>

      <v-img
      class="align-self-start "
      :src="require(`@/assets/icons/talking-character-imgs/${getFileByType(characterType)}`)"
        max-width="350">
      </v-img>


</div>




</template>

<script>


export default {
  name: 'SpeechCharacter',

  components : {

  },

  props : [
    "msg",

    "characterType",
    "bubbleType"
  ],







  data(){

    return {

      filePrefix : '@/assets/icons/talking-character-imgs/',
      ex : "hi",




      characterFileNameMap : {
        angel : "angel.png",
        jesus : "cool-jesus.png",
        moses : "handsome-moses.png",
        baby : "sussy-angel.png"

      },

      speechBubbleFileNameMap : {
        thick : "speech-bubble-3d.png",
        normal : "speech-bubble.png",
        left : "speech-bubble-left.png",
        comic : "speech-bubble-left-comic.png",
        none : "",
      },






    }

  },

  mounted(){
    console.log(this.getFileByType(this.characterType).localeCompare('@/assets/icons/talking-character-imgs/cool-jesus.png'))

  },

  methods : {
    getFileByType : function(type){

      if(type === this.characterType){
      if(this.characterType in this.characterFileNameMap){
         return this.characterFileNameMap[this.characterType]
      }

    else{
      console.error("Couldn't find that character type")
      return undefined
    }
  }

else if(type === this.bubbleType){
    if(this.bubbleType in this.speechBubbleFileNameMap){
       return this.speechBubbleFileNameMap[this.bubbleType]
    }

  else{
    console.error("Couldn't find that bubble type")
    return undefined
  }
  }

  else{
    console.error("Wtf are you binding bro")
    return undefined
  }


}




},

computed : {


}



}
</script>

<style scoped lang="scss">

.bubble-normal{


}

.bubble-text-box{
  position: relative;
  top : 16px;
  left : 42px;
  width : 65%;
  height : 60%;

}
.speech-char-container{

width: 400px;
max-height:615px;
}


.bubble{
  animation : float 2s ease-in-out infinite;

}

@keyframes float {
	0% {

		transform: translatey(0px);
	}
	50% {

		transform: translatey(-5px);
	}
	100% {

		transform: translatey(0px);
	}
}

.fade-enter-active{
  transition: opacity 4s 1s;
}

.fade-enter{
  opacity : 0;
}



</style>
