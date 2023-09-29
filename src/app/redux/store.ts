import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// Define your Redux Persist configuration
const persistConfig = {
  key: "root", // the key to use for storing the data
  version: 1,
  storage, // the storage engine to use (localStorage)
  // Add any other configuration options here
};

// Create a persisted reducer using your existing rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define the LoginState type here
export interface LoginState {
  loading: boolean;
  success: boolean;
  message: string;
  // Add any other properties you need for login state
}
export interface PasswordResetState {
  loading: boolean;
  success: boolean;
  message: string;
  // Add any other properties you need for login state
}
export interface RegistrationState {
  loading: boolean;
  success: boolean;
  message: string;
  // Add any other properties you need for login state
}

export interface UserData {
  name: string;
  email: string;
  gender: string;
  firstName: string;
  lastName: string;
  country: string;
  companyName: string;
  address: string;
  zipCode: string;
  state: string;
  phone: string;
  role: string;
  city: string;
  // Add other properties as needed
}

export interface UserState {
  name: string;
  email: string;
  gender: string;
  firstName: string;
  lastName: string;
  country: string;
  role: string;
  companyName: string;
  address: string;
  zipCode: string;
  state: string;
  phone: string;
  town: string;
  isAuthenticated: boolean;
  loading: boolean;
  userData: UserData | null; // Define UserData type according to your data structure
  error: string | null;
  // Add any other properties you need for user state
}

// Define the RootState type to include 'registration' and 'login'
export interface RootState {
  registration: RegistrationState;
  login: LoginState;
  user: UserState;
  passwordReset: PasswordResetState;
}

const store = createStore(persistedReducer, applyMiddleware(thunk));

// Create a persistor for later use
export const persistor = persistStore(store);

export default store;

// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// // Define the LoginState type here
// export interface LoginState {
//   loading: boolean;
//   success: boolean;
//   message: string;
//   // Add any other properties you need for login state
// }
// export interface RegistrationState {
//   loading: boolean;
//   success: boolean;
//   message: string;
//   // Add any other properties you need for login state
// }

// interface UserData {
//   name: string;
//   email: string;
//   gender: string;
//   // Add other properties as needed
// }

// export interface UserState {
//   loading: boolean;
//   userData: UserData | null; // Define UserData type according to your data structure
//   error: string | null;
//   // Add any other properties you need for user state
// }

// // Define the RootState type to include 'registration' and 'login'
// export interface RootState {
//   registration: RegistrationState;
//   login: LoginState;
//   user: UserState;
// }

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
