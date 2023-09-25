import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { isAuthenticatedTypes } from "./actionTypes"

const initialState = {
  isAuthenticated: false,
}

const rootReducer = (state = initialState, action) => {
  console.log("📌 action: ", action)
  switch (action.type) {
    case isAuthenticatedTypes:
      return { ...state, isAuthenticated: action.payload }

    default:
      return state
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
