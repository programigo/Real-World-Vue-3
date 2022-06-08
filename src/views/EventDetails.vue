<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    </div>
</template>

<script>

import EventService from "../services/EventService";

export default {
    props: {
        id: String,
    },
    data() {
    return {
        event: null,
    }
},
async created() {
    this.event = (await EventService.getEvent(this.id)).data;
}
};
</script>
