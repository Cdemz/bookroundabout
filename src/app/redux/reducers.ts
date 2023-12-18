// redux/reducers.ts
import { combineReducers } from "redux";
import { UserData } from "./store";
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
  REQUEST_PASSWORD_RESET_REQUEST,
  REQUEST_PASSWORD_RESET_SUCCESS,
  REQUEST_PASSWORD_RESET_FAILURE,
  CONFIRM_PASSWORD_RESET_REQUEST,
  CONFIRM_PASSWORD_RESET_SUCCESS,
  CONFIRM_PASSWORD_RESET_FAILURE,
} from "./actions";

export interface LoginState {
  loading: boolean;
  success: boolean;
  message: string;
  userData: any; // Add 'userData' property to LoginState
  error: any; // Add 'error' property to LoginState
}

// Adjust the 'initialState' to match 'LoginState'

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

export interface PasswordResetState {
  loading: boolean;
  success: boolean;
  message: string;
  error: string | null;
}

const initialState: PasswordResetState = {
  loading: false,
  success: false,
  message: "",
  error: null,
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
// new

// Define a separate state type for user-related data
export interface UserState {
  loading: boolean;
  userData: UserData | null; // Define UserData type according to your data structure
  error: string | null;
}

const initialUserState: UserState = {
  loading: false,
  userData: null,
  error: null,
};

// Update the userReducer to use UserState instead of PasswordResetState
export const userReducer = (
  state = initialUserState,
  action: any
): UserState => {
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
        loading: false,
        error: null,
        userData: action.payload, // Update userData with the fetched data
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        loading: false,
        error: null,
        userData: null, // Clear user data from the store
      };
    default:
      return state;
  }
};

// Combine this reducer with your other reducers in your rootReducer as before

// stop
export const userReducer2 = (
  state = initialState,
  action: any
): PasswordResetState => {
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
        loading: false,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_USER_DATA:
      // Clear user data from the store
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// redux/passwordResetReducer.ts

const passwordResetReducer = (
  state: PasswordResetState = initialState, // Use PasswordResetState here
  action: any
): PasswordResetState => {
  switch (action.type) {
    case REQUEST_PASSWORD_RESET_REQUEST:
    case CONFIRM_PASSWORD_RESET_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case REQUEST_PASSWORD_RESET_SUCCESS:
    case CONFIRM_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
        error: null,
      };
    case REQUEST_PASSWORD_RESET_FAILURE:
    case CONFIRM_PASSWORD_RESET_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
        error: action.error,
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
  passwordReset: passwordResetReducer,
});

export default rootReducer;
