// redux/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    user: string | null;
}

const initialState: State = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<string | null>) {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
