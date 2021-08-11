<template>
  <div>
    <canvas id="results-graph">
    </canvas>
  </div>
</template>
<script>

import Chart from 'chart.js'

export default {
  name: 'BaseGraph',

  props : [
    "config"
  ],

  data(){

    return {



    }

  },

  mounted(){
    const ctx = document.getElementById("results-graph")
    new Chart(ctx, this.config)
  }



}
</script>

<style scoped>


</style>
