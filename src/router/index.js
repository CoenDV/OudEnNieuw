import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/account/Login.vue';
import Register from '../components/account/Register.vue';
import Home from '../components/home/Home.vue';
import Account from '../components/account/Account.vue';
import Schedules from '../components/schedules/Schedules.vue';
import CreateSchedule from '../components/schedules/CreateSchedule.vue';
import UpdateSchedule from '../components/schedules/UpdateSchedule.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Login },
    { path: '/register', component: Register},
    { path: '/home', component: Home },
    { path: '/account', component: Account },
    { path: '/schedules/publicschedules', component: Schedules },
    { path: '/schedules/ownschedules', component: Schedules },
    { path: '/schedules/create', component: CreateSchedule },
    { path: '/schedules/updateschedule', component: UpdateSchedule }
  ]
})

export default router