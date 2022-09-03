import axios from "axios";
const token =
  "b8b84db74ed0a638cecdb1b5510ba7835bec9654043690d66691c90b51444a07";
export const instance = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  headers: { Authorization: "Bearer " + token },
});
