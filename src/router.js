import Vue from 'vue'
import VueRouter from "vue-router"



Vue.use(VueRouter)




export default new VueRouter({

  routes : [


    {
      path : "/",
      redirect : "/index"

    },

    {
      path : "/index",
      name : "index",
      component : () => import("./pages/IndexPage.vue")
    },

    {
      path : "/options",
      name : "options",
      component : () => import("./pages/OptionsPage.vue"),

    },



    {
      path : "/play",
      name : "play",
      component : () => import("./pages/PlayPage.vue"),


      children : [



      ],


    },




    {
      path : "/results",
      name : "results",
      component : () => import("./pages/ResultsPage.vue"),



    },


  ]

})
