// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
// import UserManagement from '@/views/UserManagement.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  // {
  //   path: '/user-management',
  //   name: 'UserManagement',
  //   component: UserManagement
  // }
];

const router = new VueRouter({
  mode: 'history',
  routes
  
});

export default router;