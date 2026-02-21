import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../js/api/axios";

export const signupUser = createAsyncThunk(
    "auth/signup",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/register", userData);
            console.log("Signup Response:", res.data);

            // Laravel API typically returns user and token
            return {
                user: res.data.user,
                token: res.data.token,
            };
        } catch (error) {
            // Laravel validation errors
            if (error.response?.status === 422) {
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue(
                error.response?.data?.message || "Signup failed",
            );
        }
    },
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
        success: false,
        validationErrors: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.success = false;
            localStorage.removeItem("token");
        },
        clearStatus: (state) => {
            state.error = null;
            state.success = false;
            state.validationErrors = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.validationErrors = null;
                state.success = false;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                console.log("fullfilled action payload:", action.payload);
                state.loading = false;
                state.success = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
                console.log("Signup successful, saccess stored:", state.success);
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;

                // Check if Laravel sent validation errors
                if (action.payload && typeof action.payload === "object") {
                    state.validationErrors = action.payload;
                } else {
                    state.error = action.payload || "Signup failed";
                }

                // state.success = false;
            });
    },
});

export const { logout, clearStatus } = authSlice.actions;

export default authSlice.reducer;
