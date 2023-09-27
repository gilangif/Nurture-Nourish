import { getDailyTypes, getFoodTypes, isAuthenticatedTypes } from "./actionTypes"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function isAuthenticatedAction(payload) {
  return { type: isAuthenticatedTypes, payload }
}
export function getDailyAction(payload) {
  return { type: getDailyTypes, payload }
}
export function getFoodByKeyAction(payload) {
  return { type: getFoodTypes, payload }
}

export function login(username, password) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("http://192.168.8.35:3000/users/login", { username, password })
      await AsyncStorage.setItem("access_token", data.access_token)
      dispatch(isAuthenticatedAction(true))
    } catch (err) {
      console.log(err)
      alert(err.response.data)
      throw err
    }
  }
}

export function register(username, email, password, name, gender, date) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("http://192.168.8.35:3000/users/register", { username, email, password, name, gender, date })
      return data
    } catch (err) {
      console.log(err, "📌📌📌📌")
      alert(err)
      throw err
    }
  }
}

export function getDaily() {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const { data } = await axios({
        url: "http://192.168.8.35:3000/nutritions",
        method: "GET",
        headers: { access_token: token },
      })
      dispatch(getDailyAction(data))
    } catch (err) {
      console.log(err, "📌📌📌📌")
      alert(err)
      throw err
    }
  }
}

export function getFoodByKey(key) {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("access_token")
      const { data } = await axios({
        url: "http://192.168.8.35:3000/foods?key=" + key,
        method: "GET",
        headers: { access_token: token },
      })
      dispatch(getFoodByKeyAction(data))
    } catch (err) {
      console.log(err, "📌📌📌📌")
      alert(err)
      throw err
    }
  }
}
