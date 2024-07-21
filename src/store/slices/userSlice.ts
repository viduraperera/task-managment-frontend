import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isAuthenticated: boolean;
    user: string | null;
    token: string | null;
    exp: number | null;
}

const initialState: UserState = {
    isAuthenticated: false,
    user: null,
    token: null,
    exp: null,
};

// Utility function to check if the token is expired
const isTokenExpired = (exp: number | null) => {
    if (exp === null) return true;
    return Date.now() >= exp * 1000;
};

const loadFromLocalStorage = (): UserState => {
    if (typeof window !== 'undefined') {
        const storedState = localStorage.getItem('userState');
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            if (!isTokenExpired(parsedState.exp)) {
                return parsedState;
            }
        }
    }
    return initialState;
};

const saveToLocalStorage = (state: UserState) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('userState', JSON.stringify(state));
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState: loadFromLocalStorage(),
    reducers: {
        loginUser: (state, action: PayloadAction<{ user: string; token: string; exp: number }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.exp = action.payload.exp;
            saveToLocalStorage(state);
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.exp = null;
            saveToLocalStorage(state);
        },
        checkTokenExpiry: (state) => {
            if (isTokenExpired(state.exp)) {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.exp = null;
                saveToLocalStorage(state);
            }
        },
    },
});

export const { loginUser, logoutUser, checkTokenExpiry } = userSlice.actions;
export default userSlice.reducer;
