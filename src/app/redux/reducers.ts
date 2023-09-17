// redux/reducers.ts
import { combineReducers } from "redux";
import nextReducer from "../store/nextSlice";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  CLEAR_USER_DATA,
} from "./actions";

export interface LoginState {
  loading: boolean;
  success: boolean;
  message: string;
  userData: any; // Add 'userData' property to LoginState
  error: any; // Add 'error' property to LoginState
}

// Adjust the 'initialState' to match 'LoginState'
const initialState: LoginState = {
  userData: null,
  loading: false,
  success: false,
  message: "",
  error: null,
};

export interface RegistrationState {
  loading: boolean;
  success: boolean;
  message: string;
}

const initialRegistrationState: RegistrationState = {
  loading: false,
  success: false,
  message: "",
};

const initialLoginState: LoginState = {
  loading: false,
  success: false,
  message: "",
  userData: null, // Initialize 'userData' here
  error: null, // Initialize 'error' here
  // Initialize other login state properties here
};

const registration = (
  state = initialRegistrationState,
  action: any
): RegistrationState => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };
    case REGISTER_FAILURE:
      return {
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

const login = (state = initialLoginState, action: any): LoginState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export const userReducer = (state = initialState, action: any): LoginState => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        userData: null,
        loading: false,
        error: action.payload,
      };

    case CLEAR_USER_DATA:
      // Clear user data from the store
      return {
        ...state,
        userData: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

// Add other reducers as needed and combine them
const rootReducer = combineReducers({
  registration, // Add other reducers here
  login,
  user: userReducer,
  next: nextReducer,
});

export default rootReducer;
