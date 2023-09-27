import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { getDailyTypes, getFoodTypes, getRecipesTypes, getSavedRecipesTypes, isAuthenticatedTypes } from "./actionTypes"

const initialState = {
  isAuthenticated: false,
  daily: [],
  foods: [],
  recipes: [],
  getSavedRecipes: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case isAuthenticatedTypes:
      return { ...state, isAuthenticated: action.payload }
    case getDailyTypes:
      return { ...state, daily: action.payload }
    case getFoodTypes:
      return { ...state, foods: action.payload }
    case getRecipesTypes:
      return { ...state, recipes: action.payload }
    case getSavedRecipesTypes:
      return { ...state, getSavedRecipes: action.payload }

    default:
      return state
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
