<template>

<v-container fill-height fluid>

</v-container>


</template>

<script>
//saves model indices for each category in the categoryList
//emits a list of all indices selected mapped to the category name



export default {
  name: 'GraphSection',
  components : {


  },

  props : [
    ""
  ],




  data(){

    return {

      categoryNames : ["jesus","doctrine","history","prophecy","genealogy","gospel","miracle"],
      model : [],
      selectedOptions : null,

    }

  },

  methods : {


  },


  watch : {

    catList : {
      immediate : true,

      handler : function(newVal){
      this.$emit("updated-info", newVal);
    }

  }

  },


  computed : {

    catList : function(){
      return this.model.map(i =>{
        return this.categoryNames[i]
      })
    },

  },


}
</script>

<style scoped>





</style>
