// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import _ from 'lodash';
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue);

library.add(fas, fab, far);
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Components from './components.js';

let easierGlobalDataObject = {
  methods: {
      $db(...args) {
          return this.$root.$db(...args);
      }
  }
}

let mixins = {};
mixins.manageGlobalDataObject = {
  // Set initial data
  data: {
      data: {}
  },
  // Methods to add or remove data
  methods: {
      $db(...args) {
          // Check arguments
          if (args.length < 1 || args.length > 2 || typeof args[0] !== 'string') {
              throw new Error('$db() should have one or two arguments, the first one should be a string');
              // Read data
          } else if (args.length === 1) {
              return _.get(this.data, args[0], undefined)
              // Write/Remove data
          } else {
              // Clone current data
              const data = _.cloneDeep(this.data);
              // Update data
              if (args[1] !== null) {
                  _.set(data, args[0], args[1])
                  // Remove data
              } else {
                  _.unset(data, args[0])
              }
              // Save data to Vue object
              this.$set(this, 'data', data)
              // Save data to local storage
              window.localStorage.data = JSON.stringify(this.data)
          }
      }
  },
  // Restore local storage
  created: function () {
      this.data = window.localStorage.data !== undefined ? JSON.parse(window.localStorage.data) : {};
  }
}

Vue.mixin(easierGlobalDataObject);
// Get local mixins as array
let useMixins = Object.keys(mixins).map(mixin => mixins[mixin]);

Components.forEach(component => Vue.component(component.name, component.component));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mixins: useMixins,
  components: { App },
  template: '<App/>'
})
