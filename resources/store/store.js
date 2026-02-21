import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import authSignupReducer from "./slices/signupslice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        authSignup: authSignupReducer,
    },
});
