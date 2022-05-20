import axios from "axios";

export const api_ = axios.create({
  baseURL: "http://localhost:8080",
});
