import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({

  theme : {

    options : { customProperties : true },

    themes : {
      light : {
        primary : '#175676',
        secondary : '#BA324F',
        accent : '#D62839',
        lightprimary : '#4BA3C3',
        background : '#CCE6F4',
        

      }
    }
  }
});
