// Composables
import { createRouter, createWebHistory } from 'vue-router'
import PDP from "@/components/Pdp";
import CART from "@/components/CART";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: "/pdp/:id",
    name: "pdp",
    component: PDP,
  },
  {
    path: "/cart",
    name: "cart",
    component: CART,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
