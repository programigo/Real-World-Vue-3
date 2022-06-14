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
  async beforeRouteEnter(routeTo, routeFrom, next) {
      try {
        const response = (await EventService.getEvents(2, parseInt(routeTo.query.page) || 1));
        
        if (response) {
          next(comp => {
            comp.events = response.data;
            comp.totalEvents = response.headers['x-total-count'];
          })
        }
      } catch(e) {
        if(e.response && e.response.status === 404) {
            next({ name: "404Resource", params: { resource: "events" } });
        } else {
            next({ name: 'NetworkError' }) 
        }
      }
  },
  async beforeRouteUpdate(routeTo) {
    try {
      const response = (await EventService.getEvents(2, parseInt(routeTo.query.page) || 1));

      if (response) {
        this.events = response.data;
        this.totalEvents = response.headers['x-total-count'];
      }
    } catch(e) {
      if (e.response && e.response.status === 404) {
            return { name: "404Resource", params: { resource: "events" } };
        } else {
            return { name: 'NetworkError' };
        }
    }
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