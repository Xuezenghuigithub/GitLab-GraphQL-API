import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue";
import Data from "../views/Data.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/data',
    name: 'Data',
    component: Data
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
