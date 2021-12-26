import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Form',
    component: ()=>import(/*webpackChunkName:form*/'../views/Form.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: ()=>import(/*webpackChunkName:form*/'../views/List.vue')
  },
  {
    path: '/tooltip',
    name: 'tooltip',
    component: ()=>import(/*webpackChunkName:form*/'../views/tooltip.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    component: ()=>import(/*webpackChunkName:form*/'../views/menu.vue')
  },
  {
    path: '/selectGroup',
    name: 'selectGroup',
    component: ()=>import(/*webpackChunkName:form*/'../views/selectGroup.vue')
  },
  {
    path: '/upFile',
    name: 'upFile',
    component: ()=>import(/*webpackChunkName:form*/'../views/upFile.vue')
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: ()=>import(/*webpackChunkName:form*/'../views/confirm.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
