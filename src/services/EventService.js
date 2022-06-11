import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})

export default({
    getEvents(perPage, page) {
        try {
            return apiClient.get(`/events?_limit=${perPage}&_page=${page}`);
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