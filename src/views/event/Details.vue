<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
    },
    async created() {
        try {
            await this.$store.dispatch("getEvent", this.id);
        } catch(e) {
            this.$router.push({ name: "ErrorDisplay", params: { error: e } });
        }
    },
    computed: {
        event() {
            return this.$store.state.event;
        },
    }
};
</script>
