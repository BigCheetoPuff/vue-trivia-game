<template>

  <v-container fluid fill-height>
  <v-row  class="" align="center" justify="center">
      <v-col class="col-auto icon-col">

        <TimePeriodChoice
        
        id="old-testament-card"
        label="Old Testament"
        fileName="old-testament-icon"
        v-on:toggled="updateTimePeriod({'type' : 'O' , 'toggled' :  $event})"></TimePeriodChoice>
    </v-col>

    <v-col class="col-auto icon-col">
        <TimePeriodChoice
        id="new-testament-card"
        label="New Testament"
        fileName="new-testament-icon"
        v-on:toggled= "updateTimePeriod({'type' : 'N' , 'toggled' :  $event})"></TimePeriodChoice>
    </v-col>

  </v-row>
</v-container>


</template>

<script>

import TimePeriodChoice from '@/components/TimePeriodChoice.vue'

//saves the time period data as a two property object -> old, new props with boolean value of them being present
//returns the object that must be parsed for database
export default {
  name: 'TimePeriodSection',
  components : {

    TimePeriodChoice,
  },

  props : [
    ""
  ],




  data(){

    return {

      choiceModel : []

    }

  },

  methods : {

    updateTimePeriod : function(choiceComponent){
      if(choiceComponent.toggled){
        this.choiceModel.push(choiceComponent.type);
      }
      else{
        this.choiceModel = this.choiceModel.filter(type => type !== choiceComponent.type);
      }
    }


  },



  computed : {


  },

  watch : {

    choiceModel : {
      immediate : true,
      handler : function(newVal){

      this.$emit('updated-info', newVal);
    }

  }


  }




}
</script>

<style scoped>





</style>
