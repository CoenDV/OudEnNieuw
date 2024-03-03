import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import CreateProduct from '../components/CreateProduct.vue';
import ProductList from '../components/ProductList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/CreateProduct', component: CreateProduct },
    { path: '/ProductList', component: ProductList }
  ]
})

export default router