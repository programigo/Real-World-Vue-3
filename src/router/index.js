import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import EventDetails from "@/views/event/Details.vue";
import EventEdit from "@/views/event/Edit.vue";
import EventRegister from "@/views/event/Register.vue";
import EventList from "@/views/EventList.vue";
import EventLayout from "@/views/event/Layout.vue";
import EventService from "@/services/EventService.js";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";
import NProgress from "nprogress";
import GStore from "@/store";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: route => ({page: parseInt(route.query.page || 1)}),
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    component: EventLayout,
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
        component: EventDetails,
      },
      {
        path: "edit",
        name: "EventEdit",
        props: true,
        component: EventEdit,
      },
      {
        path: "register",
        name: "EventRegister",
        props: true,
        component: EventRegister,
      },
    ]
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    props: true,
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    props: true,
    component: NotFound,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    props: true,
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
