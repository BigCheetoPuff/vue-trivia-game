<template>


    <div class="base-timer">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle
          class="base-timer__path-elapsed"
          cx="50"
          cy="50"
          r="45"
        />

        <path
        :stroke-dasharray="circleDashArray"
        :class="currentColor"
          ref="path_remaining"
          class="base-timer__path-remaining"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "></path>

      </g>
    </svg>
    <span class="base-timer__label">
      {{formattedTimeLeft}}
    </span>
  </div>
</template>

<script>

//FIX COLOR BLEND AT BEGINNING, INSTANT DECREMENT OF TIMER AFTER RESET, PATH RECOVERY ON LEAVING TAB

export default {
  name: 'Timer',
  props : [
    "interval",
    "initial",


  ],


  data(){

    return {
      current : this.initial,

      funcInterval : undefined,

      colorCodes : {
        ok : {
          color : "green"
        },
        warning : {
          color : "orange",
          threshold_val : this.initial/2
        },

        alert : {
          color : "red",
          threshold_val : this.initial/4
        }
      },




    }

  },

  watch : {

    funcInterval : function(val, old){
      console.log("FuncInterval changed from" + old + " to " + val)


    }
  },




  methods : {

    reset : function(){
    console.log("restarting")
    this.funcInterval = clearInterval(this.funcInterval)
    this.current = this.initial
    console.log(this.current)
    console.log(this.formattedTimeLeft)
    if(!this.funcInterval){
    this.funcInterval = setInterval(this.onTick, this.interval * 1000)
  }





    },

    stop : function(){
      this.current = 0
      clearInterval(this.funcInterval)
      console.log("stopped")

    },

    resume : function(){
      this.funcInterval = setInterval(this.onTick, this.interval * 1000)
      console.log("resumed")

    },

    pause : function(){
      clearInterval(this.funcInterval)
      console.log("paused")

    },

    onTick() {
      console.log(this.current)
      console.log(this.formattedTimeLeft)
      this.current -= this.interval
      if(this.current < 0){
        this.$emit('timer-ring')

    }



    }


  },


  computed : {

    formattedTimeLeft(){
      let minutes = Math.floor(this.current / 60)
      let seconds = Math.floor(this.current % 60)

      if(seconds < 10){
        seconds = `0${seconds}`
      }

      return `${minutes}:${seconds}`
    },

    circleDashArray() {



      return `${(this.timeFraction * 283).toFixed(0)} 283`;
    },




    timeFraction(){
      let rawTimeFraction = this.current / this.initial

        return rawTimeFraction -
          (1 / this.initial) * (1 - rawTimeFraction)
    },

    currentColor() {
      if(this.current <= this.colorCodes.alert.threshold_val){

        return this.colorCodes.alert.color
      }

      else if(this.current <= this.colorCodes.warning.threshold_val){

        return this.colorCodes.warning.color
      }

      else{

        return this.colorCodes.ok.color
      }


    },

  },




  mounted() {

    //this.reset()
  }



}
</script>

<style scoped lang="scss">
/* Sets the containers height and width */
.base-timer {
  position: relative;
  width: 100px;
  height: 100px;
/* Removes SVG styling that would hide the time label */
  &__circle {
    fill: none;
    stroke: none;
  }
/* The SVG path that displays the timer's progress */
  &__path-elapsed {
    stroke-width: 7px;
    stroke:grey;
  }
}


.base-timer {

  &__label {
    position: absolute;

    /* Size should match the parent container */
    width: 100px;
    height: 100px;
    /* Keep the label aligned to the top */
    top: 0;
    /* Create a flexible box that centers content vertically and horizontally */
    display: flex;
    align-items: center;
    justify-content: center;
    /* Sort of an arbitrary number; adjust to your liking */
    font-size: 24px;
  }

}



.base-timer {

  &__path-remaining {
    /* Just as thick as the original ring */
    stroke-width: 7px;
    /* Rounds the line endings to create a seamless circle */
    stroke-linecap: round;
    /* Makes sure the animation starts at the top of the circle */
    transform: rotate(90deg);
    transform-origin: center;
    /* One second aligns with the speed of the countdown timer */
    transition: 1s linear all;
    /* Allows the ring to change color when the color value updates */
    stroke: currentColor;

    &.green {
      color: rgb(65, 184, 131);
    }

    &.orange {
      color: orange;
    }
    &.red {
      color: red;
    }


  }
  &__svg {
    /* Flips the svg and makes the animation to move left-to-right */
    transform: scaleX(-1);
  }


}

</style>
