<template>


    <div
    class="base-timer"

    :style="[style,animationStyles]">
    <svg
      class="base-timer__svg"
      :class="{reverse : 'this.reverse'}"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle
          class="base-timer__path-elapsed"
          :style="{'stroke-width' : strokeWidth}"
          cx="50"
          cy="50"
          r="45"
        />

        <path

        :stroke-dasharray="circleDashArray"
          :style="pathStyles"
          ref="path_remaining"
          class="base-timer__path-remaining"
          :class= "{active : transitions}"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "></path>

      </g>
    </svg>
    <slot>
      <span
      :class="{handwriting : isGrade, 'important-font' : !isGrade }"
      class="base-timer__label"
      :style="[style, labelStyles]">
        {{displayText}}
      </span>
    </slot>
  </div>
</template>

<script>

//FIX COLOR BLEND AT BEGINNING, INSTANT DECREMENT OF TIMER AFTER RESET, PATH RECOVERY ON LEAVING TAB

export default {
  name: 'GradeCircle',
  props : {
    type : String,
    gradeLetter: String,
    interval: Number,
    delay : {
       type : Number,
       default : 0
     },
    count : Number,
    total: Number,
    reverse : Boolean,
    initial: {
      type : Number,
      default : 0
    },
    size: {
      type :Number,
      default : 150
    },
    strokeWidth : {
      type : Number,
      default : 150/25
    }
  },


  data(){

    return {

      active : false,

      transitions : false,

      current : this.initial,

      funcInterval : undefined,

      colorCodes : {
        ok : {
          color : "green"
        },
        warning : {
          color : "orange",
          threshold_val : this.total/2
        },

        alert : {
          color : "red",
          threshold_val : this.total/4
        }
      },




    }

  },

  watch : {



    count : function(){

      if(this.isResultsCircle){

        this.funcInterval = setInterval(this.onTick, this.interval)
      }

    }
  },




  methods : {

    reset : function(initial=false){

    //this.funcInterval = clearInterval(this.funcInterval)
    //this.funcInterval = setInterval(this.onTick, this.interval)
    this.transitions = false


    if(initial){
      this.current= this.initial
    }
    else{
      this.current = this.total
    }





      if(typeof (this.funcInterval) !== 'undefined'){
        this.funcInterval = clearInterval(this.funcInterval)
      }


        this.active = true


        this.funcInterval = setInterval(this.onTick, this.interval)










},

    toggle : function(){
      if(this.active){
        this.funcInterval = clearInterval(this.funcInterval)

      }
      else{
        if(!this.funcInterval){
        this.funcInterval = setInterval(this.onTick, this.interval)
      }
      }
      this.active = !this.active

    },





    stop : function(){
      this.current = 0
      clearInterval(this.funcInterval)
    },


    onTick() {

      if(!this.transitions){
        this.transitions = !this.transitions
      }


      if(this.isGrade){
        if(this.timeFraction >= 1){

          clearInterval(this.funcInterval)
        }
        this.current += .1

      }

      else if(this.isResultsCircle){
        if(this.current >= this.count){

          clearInterval(this.funcInterval)

        }
        else{

            this.current += this.interval/100
        }

      }

      else if(this.isTimer){
        this.current -= 1
        if(this.current < 0){
          this.stop()
          this.$emit('timer-ring')



      }

      }




    }


  },


  computed : {

    isTimer(){
      return this.type==="timer"
    },
    isResultsCircle(){
      return this.type==="results"
    },

    isGrade(){
      return this.type==="grade"
    },

    displayText(){
      if(this.isGrade){
        return this.gradeLetter
      }
      else if(this.isResultsCircle) {
        return `${this.count}/${this.total}`
      }

      else if(this.isTimer){
        let minutes = Math.floor(this.current / 60)
        let seconds = Math.floor(this.current % 60)

        if(seconds < 10){
          seconds = `0${seconds}`
        }

        return `${minutes}:${seconds}`
      }
      else{
        return undefined
      }

    },


    circleDashArray() {

      let dasharray = `${(this.timeFraction * 283).toFixed(0)} 283`

      return dasharray;
    },

    timeFraction(){
      if(this.isResultsCircle){

      return this.current / this.total
    }


    else if(this.isTimer){
      let rawTimeFraction = this.current / this.total

        return rawTimeFraction -
          (1 / this.total) * (1 - rawTimeFraction)
    }

    else if(this.isGrade){

      return this.current
    }
    else {
      return undefined
    }

    },

    animationStyles(){

      let percent = this.current/this.total


      if(this.isTimer){
        if(percent <= 0){
          return {
            'animation' : '1s linear infinite shake-fast'
          }
        }

        else if(percent < .6){
          return {
            'animation' : '1s linear infinite pulse'
          }
        }

        else {
          return {}
        }

      }
      else return {}



    },


    pathStyles(){
      let pathColor = ""
      pathColor = this.currentColor

    return {
      'stroke' : pathColor,
      'stroke-width' : this.strokeWidth
    }

    },

    labelStyles(){
      let color = 'black'
      if(this.isGrade){
        color = "#c2022f"
      }
      return {
        'color' : color
      }

    },


    style(){

      return {
        '--size' : this.size + 'px',
        '--font-size' : `${this.size/3}px`

      }
    },







    currentColor() {

      if(this.isGrade){

        return '#c2022f'
      }
      else if(this.isResultsCircle){

        return '#2c6e2f'
      }

      else{

      if(this.current <= this.colorCodes.alert.threshold_val){

        return this.colorCodes.alert.color
      }

      else if(this.current <= this.colorCodes.warning.threshold_val){

        return this.colorCodes.warning.color
      }

      else{

        return this.colorCodes.ok.color
      }

    }


    },

  },




  mounted() {

    console.log(this.initial, this.current, this.total)
    this.reset(true)







}



}
</script>

<style scoped lang="scss">
/* Sets the containers height and width */
.base-timer {
  display: inline-block;
  position: relative;
  width: var(--size);
  height: var(--size);

/* Removes SVG styling that would hide the time label */
  &__circle {
    fill: none;
    stroke: none;



  }
/* The SVG path that displays the timer's progress */
  &__path-elapsed {
    width: var(--size);
    height: var(--size);
    stroke : lightgrey;


  }

  &__label {
    position: absolute;

    /* Size should match the parent container */
    width: var(--size);
    height: var(--size);
    /* Keep the label aligned to the top */
    top: 0;

    /* Create a flexible box that centers content vertically and horizontally */
    display: flex;
    align-items: center;
    justify-content: center;
    /* Sort of an arbitrary number; adjust to your liking */
    font-size: var(--font-size);
    color: #c2022f;
  }


  &__path-remaining {
    /* Just as thick as the original ring */
    /* Rounds the line endings to create a seamless circle */
    stroke-linecap: round;
    /* Makes sure the animation starts at the top of the circle */
    transform: rotate(90deg);
    transform-origin: center;
    /* One second aligns with the speed of the countdown timer */

    &.active{
      transition: 1s linear all;

    }


    /* Allows the ring to change color when the color value updates */



  }
  &__svg.reverse {
    /* Flips the svg and makes the animation to move left-to-right */
    transform: scaleX(-1);
  }


}







</style>
