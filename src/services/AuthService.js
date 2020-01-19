import store from "../store";
import { http } from './HttpService';
import jwt from "jsonwebtoken";

export function isLoggedIn() {
  const token = localStorage.getItem("token");
  return token != null;
}

export function login(user) {
  return http().post('/user/login', user).then(res => {
    if (res) {
      setToken(res.data.token);
    }
  });
}

export function registerUser(user) {
  return http().post('/user/register', user);
}

function setToken(token) {
  localStorage.setItem('token', token);
  store.dispatch('authenticate');
}

export function logout() {
  localStorage.clear();
  store.dispatch("authenticate");
}

export function getToken() {
  return localStorage.getItem("token");
}

function decodeToken() {
  const token = getToken();
  if (!token) {
    return null;
  }
  return jwt.decode(token);
}

export function getUsername() {
  const token = decodeToken();
  if (!token) {
    return null;
  }
  return token.username;
}

export function getUserId() {
  const token = decodeToken();
  if (!token) {
    return null;
  }
  return token.userid;
}
