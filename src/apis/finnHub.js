import axios from 'axios';

const TOKEN = "ccfdevqad3ifmhk0sp80"

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})