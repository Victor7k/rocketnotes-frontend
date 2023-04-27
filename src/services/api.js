import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3333" // Esse é o endereço q está rodando em seu computador
}); // https://rocketnotes-api-kddw.onrender.com