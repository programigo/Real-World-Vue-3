import { createStore } from "vuex";
import EventService from "@/services/EventService";

const store = createStore({
    state: {
        user: "Krasimir Vladimirov",
        events: [],
        event: {},
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event);
        },
        SET_EVENTS(state, events) {
            state.events = events;
        },
        SET_EVENT(state, event) {
            state.event = event;
        },
    },
    actions: {
        async createEvent({ commit }, event) {
            try {
                await EventService.postEvent(event);
                commit("ADD_EVENT", event);
            } catch(e) {
                throw(e.message);
            }
        },
        async getEvents({ commit }, payload) {
            try {
                const response = await EventService.getEvents(payload.perPage, payload.page);
                commit("SET_EVENTS", response.data);
                return response.data;
            } catch(e) {
                throw(e.message);
            }
        },
        async getEvent({ commit, state }, id) {
            try {
                const existingEvent = state.events.find(x => x.id === id);

                if(existingEvent) {
                    commit("SET_EVENT", existingEvent);
                } else {
                    const response = await EventService.getEvent(id);
                    commit("SET_EVENT", response.data);
                    return response.data;
                }
            } catch(e) {
                throw(e.message);
            }
        }
    },
    getters: {},
});

export default store;
