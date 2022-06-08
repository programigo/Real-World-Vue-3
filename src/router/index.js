import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import EventDetails from "../views/EventDetails";
import EventList from "../views/EventList.vue";


const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
  },
  {
    path: "/events/:id",
    name: "EventDetails",
    props: true,
    component: EventDetails,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
