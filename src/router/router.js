import Vue from "vue";
import VueRouter from "vue-router";

const HomePage = () => import('@/views/HomePage.vue') //Lazy Load
const SignInPage = () => import('@/views/SignInPage.vue')
const RegisterPage = () => import('@/views/RegisterPage.vue')
const SearchedPage = () => import('@/views/SearchedPage.vue')
const DashboardPage = () => import('@/views/DashboardPage.vue')

Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/sign-in',
      name: 'SignInPage',
      component: SignInPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/searched',
      name: 'SearchedPage',
      component: SearchedPage
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardPage
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;