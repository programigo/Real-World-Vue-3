import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import EventDetails from "@/views/event/Details.vue";
import EventEdit from "@/views/event/Edit.vue";
import EventRegister from "@/views/event/Register.vue";
import EventList from "@/views/EventList.vue";
import EventLayout from "@/views/event/Layout.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";


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
    props: true,
    component: EventLayout,
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

export default router;
