import Vue from "vue";
import VueRouter from "vue-router";

const HomePage = () => import('@/views/HomePage.vue') //Lazy Load
const SignInPage = () => import('@/views/SignInPage.vue')
const RegisterPage = () => import('@/views/RegisterPage.vue')
const SearchedPage = () => import('@/views/SearchedPage.vue')
const DashboardPage = () => import('@/views/DashboardPage.vue')
const SettingsPage = () => import('@/views/SettingsPage.vue')
const FavoritesPage = () => import('@/views/FavoritesPage.vue')
const MyEstatePage = () => import('@/views/MyEstatePage.vue')


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
    },
    {
      path: '/account-settings',
      name: 'Settings',
      component: SettingsPage
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: FavoritesPage
    },
    {
      path: '/my-estate',
      name: 'MyEstate',
      component: MyEstatePage
    }

];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;