import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { getDailyTypes, isAuthenticatedTypes } from "./actionTypes"

const initialState = {
  isAuthenticated: false,
  daily: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case isAuthenticatedTypes:
      return { ...state, isAuthenticated: action.payload }
    case getDailyTypes:
      return { ...state, daily: action.payload }

    default:
      return state
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
