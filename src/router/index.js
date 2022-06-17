import { createRouter, createWebHistory } from "vue-router";
import EventService from "@/services/EventService.js";
import NProgress from "nprogress";
import GStore from "@/store";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: () => import(/* webpackChunkName: event-list */ "@/views/EventList.vue"),
    props: route => ({page: parseInt(route.query.page || 1)}),
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    component: () => import(/* webpackChunkName: event-layout */ "@/views/event/Layout.vue"),
    beforeEnter: async function (to) {
      try {
        GStore.event = (await EventService.getEvent(to.params.id)).data;
      } catch (e) {
        if (e.response && e.response.status === 404) {
          return { name: "404Resource", params: { resource: "event" } };
        } else {
          return { name: "NetworkError" };
        }
      }
    },
    children: [
      {
        path: "",
        name: "EventDetails",
        props: true,
        component: () => import(/* webpackChunkName: event-details */ "@/views/event/Details.vue"),
      },
      {
        path: "edit",
        name: "EventEdit",
        props: true,
        component: () => import(/* webpackChunkName: event-edit */ "@/views/event/Edit.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "register",
        name: "EventRegister",
        props: true,
        component: () => import(/* webpackChunkName: register */ "@/views/event/Register.vue"),
        meta: { requireAuth: true },
      },
    ]
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
    GStore.flashMessage = "Sorry, you are not authorized to view this page";

    setTimeout(() => {
      GStore.flashMessage = ""
    }, 3000);

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
