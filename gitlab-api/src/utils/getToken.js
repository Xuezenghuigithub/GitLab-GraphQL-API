import axios from 'axios';

export default function getToken(code) {
  // axios.post("/api/token", { code });
  return axios('http://localhost/token', { data: { code } })
}