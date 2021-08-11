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
    <slot>
      <span class="base-timer__label important-font">
        {{count}}/{{total}}
      </span>
    </slot>
  </div>
</template>

<script>

//FIX COLOR BLEND AT BEGINNING, INSTANT DECREMENT OF TIMER AFTER RESET, PATH RECOVERY ON LEAVING TAB

export default {
  name: 'ResultsCircle',
  props : {
    count : Number,
    total : Number,
    passive : {
      type :Boolean,
      default : false
    },


  },


  data(){

    return {

      current : 0,

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


  },




  methods : {

    elapse : function(){

    this.funcInterval = setInterval(this.onTick, 50)

    },


    onTick() {


      if(this.current >= this.count){
        clearInterval(this.funcInterval)
      }
      else{

          this.current += 1
      }




    }


  },


  computed : {

    timeFraction(){
      if(this.passive){
        return (this.current-1)/ this.total
      }
      return this.current / this.total

    },


    circleDashArray() {



      return `${(this.timeFraction * 283).toFixed(0)} 283`;
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

    this.elapse()
  }



}
</script>

<style scoped lang="scss">
/* Sets the containers height and width */
.base-timer {
  position: relative;
  width: 150px;
  height: 150px;

/* Removes SVG styling that would hide the time label */
  &__circle {
    fill: none;
    stroke: none;

  }
/* The SVG path that displays the timer's progress */
  &__path-elapsed {
    stroke-width: 10px;
    stroke:lightgrey;

  }
}


.base-timer {

  &__label {
    position: absolute;

    /* Size should match the parent container */
    width: 150px;
    height: 150px;
    /* Keep the label aligned to the top */
    top: 0;
    /* Create a flexible box that centers content vertically and horizontally */
    display: flex;
    align-items: center;
    justify-content: center;
    /* Sort of an arbitrary number; adjust to your liking */
    font-size: 48px;
  }

}



.base-timer {

  &__path-remaining {
    /* Just as thick as the original ring */
    stroke-width: 10px;
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
