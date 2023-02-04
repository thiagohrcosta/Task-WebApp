import axios from "axios";

const api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL,
  header: {
    "Content-Type": "application/json",
    "Allow-Control-Allow-Origin": "*",
  },
});

export { api };