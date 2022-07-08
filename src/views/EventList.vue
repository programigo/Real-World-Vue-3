<template>
  <div class="events">
    <EventCard 
      v-for="event in events"
      :key="event.id"
      :event="event"
     />
    <div class="pagination">
      <router-link
        :to="{name: 'EventList', query: {page: page - 1}}"
        rel="prev"
        v-if="page != 1">
        &#60; Previous
      </router-link>
      <router-link
        :to="{name: 'EventList', query: {page: page + 1}}"
        rel="next"
        v-if="hasNextPage">
        Next &#62;
     </router-link>
    </div>
  </div>
</template>

<script>

import EventCard from "@/components/EventCard.vue";
import store from "@/store";
import router from "@/router";

const EVENTS_PER_PAGE = 8;

export default {
  name: "EventList",
  props: {
    page: Number,
  },
  components: {
    EventCard,
  },
  async beforeRouteEnter(routeTo, routeFrom, next) {
      try {
        const payload = {
          perPage: EVENTS_PER_PAGE,
          page: parseInt(routeTo.query.page) || 1,
        };

        await store.dispatch("getEvents", payload);
        next();
      } catch(e) {
        router.push({ name: "ErrorDisplay", params: { error: e } });
      }
  },
  async beforeRouteUpdate(routeTo) {
    try {
      const payload = {
        perPage: EVENTS_PER_PAGE,
        page: parseInt(routeTo.query.page) || 1,
      };

      await store.dispatch("getEvents", payload);
    } catch(e) {
      router.push({ name: "ErrorDisplay", params: { error: e } });
    }
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / 2);
      return this.page < totalPages;
    },
    events() {
      return store.state.events;
    },
    totalEvents() {
      return store.state.events.length;
    }
  }
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>