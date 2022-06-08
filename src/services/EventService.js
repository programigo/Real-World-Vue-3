import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})

export default({
    getEvents() {
        try {
            return apiClient.get("/events");
        } catch(e) {
            console.log(e.message);
        }
    },
    getEvent(id) {
        try {
            return apiClient.get(`/events/${id}`);
        } catch(e) {
            console.log(e.message);
        }
    }
})