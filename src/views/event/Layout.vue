<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <div id="nav">
        <router-link :to="{ name: 'EventDetails' }"
            >Details</router-link
        >
        |
        <router-link :to="{ name: 'EventRegister' }"
            >Register</router-link
        >
        |
        <router-link :to="{ name: 'EventEdit' }"
            >Edit</router-link
        >
        </div>
        <router-view :event="event" />
    </div>
</template>

<script>

import EventService from "@/services/EventService";

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
    try {
        this.event = (await EventService.getEvent(this.id)).data;
    } catch(e) {
        if(e.response && e.response.status === 404) {
            this.$router.push({ name: "404Resource", params: { resource: "event" } });
        } else {
            this.$router.push({ name: "NetworkError" });
        }
    }
}
};
</script>
