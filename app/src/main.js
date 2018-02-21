// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import BookStore from './components/BookStore'
import NewBookForm from './components/NewBookForm.vue'

import $ from 'jquery'

Vue.use(VueRouter)
Vue.config.productionTip = false;
const baseUrl = 'https://evening-spire-37771.herokuapp.com';
const routes = [
  { path: '/', component: BookStore },
  { path: '/add', component: NewBookForm, props: { isReadOnly: false } },
  { path: '/book/:id', component: NewBookForm, props: { isReadOnly: true } }
];
const router = new VueRouter({ routes });
$.ajaxSetup({
      beforeSend: function(xhr, options) {
        options.url = baseUrl + options.url;
      },
      dataType : "json",
      contentType: "application/json; charset=utf-8"
  });

  window.vm = new Vue({
    el: '#app',
    template: '<App />',
    components: { App },
    data () {
      return {
      }
    },
    router: router
  });

