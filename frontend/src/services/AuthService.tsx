import axios from "axios";

const API_URL = "http://localhost:8080/api/users/";

const register = (userData: any) => {
  return axios.post(API_URL + "register", userData);
};

const login = (userData: any) => {
  return axios.post(API_URL + "login", userData);
};

export { register, login };
