import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/page/HomeView.vue'
import ZooComponent from '../components/zoo/ZooComponents.vue'
import AnimalComponent from '../components/animal/AnimalComponent.vue'
import UserComponent from '../components/user/UserComponent.vue'
import SignUp from '../views/user/SignUp.vue'
import LogIn from '../views/user/LogIn.vue'
import DashBoardView from '../views/page/DashBoardView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoardView,
  },
  {
    path: '/zoo',
    name: 'zoo',
    component: ZooComponent
  },
  {
    path: '/user',
    name: 'user',
    component: UserComponent
  }, 
  {
    path: '/animal',
    name: 'animal',
    component: AnimalComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
