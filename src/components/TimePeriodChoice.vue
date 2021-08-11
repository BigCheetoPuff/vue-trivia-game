<template>

  <div class="time-period-container">
    <div class="icon-circle d-flex elevation-8 time-period-circle" :class="{selected:toggled}"  @click="toggleCheckMark">
        <v-img
        class="time-period-icon"
        max-width="100%"
        :src = "require(`@/assets/icons/time-period_imgs/${fileName}.png`)"
        >
        </v-img>
      </div>
    <v-row no-gutters class="label-row mt-3" justify ="end" align="center">
      <v-col class="col-8">
        <p class="icon-label">{{label}}</p>
      </v-col>

      <v-col class="col-2">
        <transition name="fade">
          <v-icon
          v-show="toggled"
          color="secondary"
          class="icon"
          >
            mdi-checkbox-marked-circle
          </v-icon>
      </transition>
      </v-col>

  </v-row>
  </div>


</template>

<script>


export default {
  name: 'TimePeriodChoice',

  props : [
    "fileName",
    "label"
  ],




  data(){

    return {

      toggled : false,


    }

  },

  methods : {

    toggleCheckMark : function(){
        this.toggled = !this.toggled;
        this.$emit("toggled", this.toggled)

    }

  },

  computed : {


  },


}
</script>

<style scoped lang="scss">

.time-period-container{
  margin-left : 24px;
  margin-right : 24px;
}
.icon{

margin-left: -15px;


}
.label-row{
  min-height: 34px;
}
.icon-circle{

width:200px;
height:200px;
border-radius:100px;
background-color: var(--v-lightprimary-base);
border: 5px solid var(--v-primary-base);

}

.time-period-container .icon-label{
  margin-bottom: 0;
  font-size:15px;
  color: var(--v-primary-base);
  font-weight:bolder;
}



.icon-circle{
  transition: transform .2s, border  .2s, background-color .2s;
}

.icon-label{
  transition : transform .2s;
}

.icon-circle:hover + .label-row .icon-label{
transform : scale(1.1);

}
.icon-circle:hover{

transform: scale(1.1);
background-color: var(--v-lightprimary-base);
border: 7px solid var(--v-secondary-base);
cursor: pointer;
}

.selected{
border: 7px solid var(--v-secondary-base);
transform: scale(1.1);
}

.selected + .label-row .icon-label{
  transform : scale(1.1);
}



.icon-label-container .icon-label{

  margin-top:20px;
  font-size:15px;
  color: var(--v-primary-base);
  font-weight:bolder;
}


.fade-enter-active{
  transition : opacity 1s;

}

.fade-leave-active{
  transition : opacity .3s;
}

.fade-leave{
  opacity : 1;
}

.fade-enter, .fade-leave-to{

  opacity : 0;
}




</style>
