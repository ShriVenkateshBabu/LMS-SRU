import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../js/api/axios";

/* ============================
   SIGNUP API CALL
============================ */
export const signupUser = createAsyncThunk(
    "auth/signup",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/register", userData);
            console.log("Signup Response:", res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Signup failed",
            );
        }
    },
);

/* ============================
   LOGIN API CALL (Optional)
============================ */
export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/login", userData);

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed",
            );
        }
    },
);

/* ============================
   AUTH SLICE
============================ */
const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
        success: false,
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
        },
    },

    extraReducers: (builder) => {
        builder

            /* ====================
               SIGNUP
            ===================== */
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                state.user = action.payload.user;
                console.log("Signup Success, Token:", action.payload.token);
                state.token = action.payload.token;

                localStorage.setItem("token", action.payload.token);
            })

            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ====================
               LOGIN
            ===================== */
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                state.user = action.payload.user;
                state.token = action.payload.token;

                localStorage.setItem("token", action.payload.token);
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

/* ============================
   EXPORTS
============================ */

export const { logout, clearStatus } = authSlice.actions;

export default authSlice.reducer;
