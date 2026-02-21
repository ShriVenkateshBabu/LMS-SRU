import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ----------------------------------
   LOGIN API CALL
---------------------------------- */
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post("/login", data);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

/* ----------------------------------
   AUTH SLICE
---------------------------------- */
const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        // inside authslice.js reducers
        clearStatus: (state) => {
            state.error = null;
            state.isAuthenticated = false;
        },
    },

    extraReducers: (builder) => {
        builder

            /* LOGIN START */
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            /* LOGIN SUCCESS */
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })

            /* LOGIN FAILED */
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Login failed";
            });
    },
});

export const { logout, clearStatus } = authSlice.actions;

export default authSlice.reducer;
