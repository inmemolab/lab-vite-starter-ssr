import axios from "axios";

export function getList() {
  return axios.post("http://localhost:8081/api/users");
}
