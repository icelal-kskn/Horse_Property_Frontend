import Vue from "vue";
import VueRouter from "vue-router";

const HomePage = () => import('@/views/HomePage.vue') //Lazy Load
const SignInPage = () => import('@/views/SignInPage.vue')
const RegisterPage = () => import('@/views/RegisterPage.vue')
const SearchedPage = () => import('@/views/SearchedPage.vue')
const DashboardPage = () => import('@/views/DashboardPage.vue')
const ProfilePage = () => import('@/views/ProfilePage.vue')
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
      path: '/my-profile',
      name: 'Settings',
      component: ProfilePage
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
    },
    {
      path: '*',
      redirect: '/'
    }

];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;