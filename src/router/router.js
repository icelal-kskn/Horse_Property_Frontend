import Vue from "vue";
import VueRouter from "vue-router";

const HomePage = () => import('@/views/HomePage.vue') //Lazy Load


Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;