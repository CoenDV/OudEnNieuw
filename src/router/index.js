import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/common/Login.vue';
import Home from '../components/common/index.vue';
import Quiz from '../components/quiz/Quiz.vue';
import Shop from '../components/shop/Shop.vue';
import Challenge from '../components/challenge/Challenge.vue';

import Presentation from '../components/big_screen/Presentation.vue';
import Admin from '../components/big_screen/Admin.vue';
import QuizScreen from '../components/big_screen/QuizScreen.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/quiz', component: Quiz },
    { path: '/shop', component: Shop },
    { path: '/challenge', component: Challenge },
    { path: '/presentation', component: Presentation },
    { path: '/admin', component: Admin },
    { path: '/quizscreen', component: QuizScreen },
  ]
})

export default router