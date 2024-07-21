// authApiSlice.ts

import apiSlice from "../utility/api.slice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useLoginMutation } = authApiSlice;
