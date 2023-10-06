// redux/actions.ts
import { Dispatch } from "redux";
import {
  registerUser,
  loginUser,
  fetchUserData,
  updateUser,
  requestPasswordReset,
  confirmPasswordReset,
} from "../utils/api";
import toast from "react-hot-toast";
import { RootState } from "./store";

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
      if (response?.token) {
        dispatch(registerSuccess(response.message));
        dispatch(fetchUserAction() as any);
        toast.success(`Registration successful, Welcome!`);
      } else if (response?.statusCode) {
        // Handle other error cases returned by the server
        // console.log("Response Status Code:", response.statusCode);
        // console.log("Response Message:", response.message);
        // console.log("Response:", response);
        if (response?.status) {
          toast.error(response.message);
          // Handle invalid credentials error
          dispatch(
            registerFailure("Invalid username or password. Please try again.")
          );
        } else {
          // Handle other error cases
          dispatch(registerFailure(response.message));
          toast.error("An error occured");
        }
      } else {
        // other error
        toast.error("An error occured, Please try again");
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
      // console.log("Response:", response);
      // toast.success(response.token || "an error occured");

      if (response?.token) {
        // Assuming your API returns a success message upon successful login
        dispatch(fetchUserAction() as any);
        dispatch(loginSuccess("Login successful"));
        toast.success(`Welcome, ${userData.firstName}!`);
      } else if (response?.statusCode) {
        // Handle other error cases returned by the server
        // console.log("Response Status Code:", response.statusCode);
        // console.log("Response Message:", response.message);
        // console.log("Response:", response);
        if (response?.statusCode === 400) {
          toast.error(response.message);
          // Handle invalid credentials error
          dispatch(
            loginFailure("Invalid username or password. Please try again.")
          );
        } else {
          // Handle other error cases
          dispatch(loginFailure(response.message));
          toast.error("An error occured");
        }
      } else {
        // other error
        toast.error("An error occured, Please try again");
      }
    } catch (error) {
      // console.log("leigh fucked up");
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

      // console.log("succeful ", userData);
      // Dispatch the user data to the Redux store
      dispatch(fetchUserSuccess(userData));
      // console.log("succeful d", userData);
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

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

// Action Creators
export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (updatedUserData: any) => ({
  type: UPDATE_USER_SUCCESS,
  payload: updatedUserData,
});

export const updateUserFailure = (error: string) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

// Async Action Creator
export const updateUserAction = (userData: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateUserRequest());

    try {
      const updatedUserData = await updateUser(userData); // Call the API to update user data

      // Dispatch a success action with the updated user data
      dispatch(updateUserSuccess(updatedUserData));
    } catch (error: any) {
      // Dispatch a failure action with the error message
      dispatch(updateUserFailure(error.message));
    }
  };
};

// forgotPasswordActions.ts

// redux/actions.ts

// Action types
export const REQUEST_PASSWORD_RESET_REQUEST = "REQUEST_PASSWORD_RESET_REQUEST";
export const REQUEST_PASSWORD_RESET_SUCCESS = "REQUEST_PASSWORD_RESET_SUCCESS";
export const REQUEST_PASSWORD_RESET_FAILURE = "REQUEST_PASSWORD_RESET_FAILURE";

export const CONFIRM_PASSWORD_RESET_REQUEST = "CONFIRM_PASSWORD_RESET_REQUEST";
export const CONFIRM_PASSWORD_RESET_SUCCESS = "CONFIRM_PASSWORD_RESET_SUCCESS";
export const CONFIRM_PASSWORD_RESET_FAILURE = "CONFIRM_PASSWORD_RESET_FAILURE";

// Action creators for requesting password reset
export const requestPasswordResetRequest = () => ({
  type: REQUEST_PASSWORD_RESET_REQUEST,
});

export const requestPasswordResetSuccess = (message: string) => ({
  type: REQUEST_PASSWORD_RESET_SUCCESS,
  payload: message,
});

export const requestPasswordResetFailure = (error: string) => ({
  type: REQUEST_PASSWORD_RESET_FAILURE,
  payload: error,
});

// Action creator for confirming password reset
export const confirmPasswordResetRequest = () => ({
  type: CONFIRM_PASSWORD_RESET_REQUEST,
});

export const confirmPasswordResetSuccess = (message: string) => ({
  type: CONFIRM_PASSWORD_RESET_SUCCESS,
  payload: message,
});

export const confirmPasswordResetFailure = (error: string) => ({
  type: CONFIRM_PASSWORD_RESET_FAILURE,
  payload: error,
});

// Action to request password reset
export const requestPasswordResetAction =
  (email: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(requestPasswordResetRequest());
      const response = await requestPasswordReset(email);
      dispatch(requestPasswordResetSuccess(response.message));
    } catch (error: any) {
      dispatch(requestPasswordResetFailure(error.message));
    }
  };

// Action to confirm password reset
export const confirmPasswordResetAction =
  (newPassword: string, confirmPassword: string, token: string) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    // Add getState argument
    try {
      dispatch(confirmPasswordResetRequest());

      // Get email from the Redux store's state (you can modify this part as needed)
      const state = getState();
      const email = state.user.userData?.email || "";

      const response = await confirmPasswordReset(email, token, newPassword);
      dispatch(confirmPasswordResetSuccess(response.message));
    } catch (error: any) {
      dispatch(confirmPasswordResetFailure(error.message));
    }
  };

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
