import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import ErrorDisplay from "../views/ErrorDisplay.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: () => import(/* webpackChunkName: event-list */ "@/views/EventList.vue"),
    props: route => ({page: parseInt(route.query.page || 1)}),
  },
  {
    path: "/events/:id",
    name: "EventDetails",
    props: true,
    component: () => import(/* webpackChunkName: event-details */ "@/views/event/Details.vue"),
  },
  {
    path: "/events/create",
    name: "EventCreate",
    component: () => import(/* webpackChunkName: event-create */ "@/views/event/Create.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: about */ "@/views/About.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    props: true,
    component: () => import(/* webpackChunkName: not-found */ "@/views/NotFound.vue"),
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    props: true,
    component: () => import(/* webpackChunkName: 404-resource */ "@/views/NotFound.vue"),
  },
  {
    path: "/network-error",
    name: "NetworkError",
    props: true,
    component: () => import(/* webpackChunkName: network-error */ "@/views/NetworkError.vue"),
  },
  {
    path: "/error/:error",
    name: "ErrorDisplay",
    props: true,
    component: ErrorDisplay,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    
    return { top: 0 }
  }
});

router.beforeEach((to, from) => {
  NProgress.start();

  if (to.meta.requireAuth) {
    if (from.href) {
      return false;
    } else {
      return { path: "/" };
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
