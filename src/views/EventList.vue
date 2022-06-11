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

import { watchEffect } from "vue";
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService";

export default {
  name: "EventList",
  props: {
    page: Number,
  },
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },
  created() {
    watchEffect(async() => {
      try {
        this.events = null;
        const response = (await EventService.getEvents(2, this.page));
        this.events = response.data;
        this.totalEvents = response.headers["x-total-count"];
      } catch(e) {
        if(e.response && e.response.status === 404) {
            this.$router.push({ name: "404Resource", params: { resource: "events" } });
        } else {
            this.$router.push({ name: "NetworkError" });
        }
      }
    })
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / 2);

      return this.page < totalPages;
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