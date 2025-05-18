// export const baseURL = "http://127.0.0.1:8000/api";
export const baseURL = "/api"; // Relative to the same domain

const token = localStorage.getItem("token") ?? null;

export const TOKEN = token;

export const isLoggedIn = localStorage.getItem("isLoggedIn") ? true : false;
