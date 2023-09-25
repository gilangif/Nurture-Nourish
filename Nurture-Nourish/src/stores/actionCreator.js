import { isAuthenticatedTypes } from "./actionTypes"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function isAuthenticatedAction(payload) {
  return { type: isAuthenticatedTypes, payload }
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
      const { data } = await axios.post("http://192.168.8.35:3000/users/register", { username, email, password, name, gender, date  })
      return data
    } catch (err) {
      console.log(err, "📌📌📌📌")
      alert(err)
      throw err
    }
  }
}
