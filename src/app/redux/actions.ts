// redux/actions.ts
import { Dispatch } from "redux";
import { registerUser } from "../utils/api"; // Import your API function for registration
import axios from "axios";
import { loginUser } from "../utils/api";
import { fetchUserData } from "../utils/api";
import { AnyAction } from "redux";
// Action Types
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

// Action Creators
export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (message: string) => ({
  type: REGISTER_SUCCESS,
  payload: message,
});

export const registerFailure = (error: string) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const registerUserAction = (userData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(registerRequest());

      // Make the API call to register the user
      const response = await registerUser(userData);

      // Assuming your API returns a success message upon successful registration
      if (response.success) {
        dispatch(registerSuccess(response.message));
        dispatch(fetchUserAction() as any);
      } else {
        dispatch(registerFailure(response.message));
      }
    } catch (error) {
      dispatch(registerFailure("Registration failed. Please try again."));
    }
  };
};

// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Action Creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (message: string) => ({
  type: LOGIN_SUCCESS,
  payload: message,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUserAction = (userData: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest());

    try {
      // Make the API call to log in the user
      const response = await loginUser(userData);
      console.log("Response:", response);

      if (response.success) {
        dispatch(loginSuccess(response.message));
        dispatch(fetchUserAction() as any);
      } else {
        dispatch(loginFailure(response.message));
      }
    } catch (error) {
      dispatch(loginFailure("Login failed. Please try again."));
    }
  };
};

// Define the UserState type
export interface UserState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

// Define the initialUserState
const initialUserState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

// Define the UserData type according to your data structure
export interface UserData {
  name: string;
  email: string;
  // Other properties...
}

// Define the UserAction type (your action creators should return actions of this type)
export type UserAction =
  | { type: "FETCH_USER_REQUEST" }
  | { type: "FETCH_USER_SUCCESS"; payload: UserData }
  | { type: "FETCH_USER_FAILURE"; payload: string };

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (userData: any) => ({
  type: FETCH_USER_SUCCESS,
  payload: userData,
});

export const fetchUserFailure = (error: string) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

// Action to fetch user data and store it in local storage
export const fetchUserAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchUserRequest());

      // Make the API call to fetch user data
      const userData = await fetchUserData(); // Replace with your actual API call

      // Store user data in local storage:
      localStorage.setItem("userData", JSON.stringify(userData));

      console.log("succeful ", userData);
      // Dispatch the user data to the Redux store
      dispatch(fetchUserSuccess(userData));
      console.log("succeful d", userData);
    } catch (error) {
      dispatch(fetchUserFailure("Failed to fetch user data."));
    }
  };
};

// Action Types
export const CLEAR_USER_DATA = "CLEAR_USER_DATA"; // Define the action type

// Action Creator
export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

// Reducer for the user state
// const userReducer = (
//   state: UserState = initialUserState,
//   action: UserAction
// ): UserState => {
//   switch (action.type) {
//     case FETCH_USER_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case FETCH_USER_SUCCESS:
//       return {
//         ...state,
//         userData: action.payload,
//         loading: false,
//         error: null,
//       };
//     case FETCH_USER_FAILURE:
//       return {
//         ...state,
//         userData: null,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
