import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOCAL_STORAGE } from '@/constants/globalconstants';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // Adjust this to match your backend base URL
    prepareHeaders: (headers, { getState }) => {
        // Optionally, set any additional headers here
        const userStateString = localStorage.getItem(LOCAL_STORAGE.USER_STATE);
        if (userStateString) {
            const userState = JSON.parse(userStateString);
            const accessToken = userState.token;
            headers.set('Authorization', accessToken);
        } else {
            headers.delete('noAuth');
        }
        return headers;
    },
});

const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Tasks'],
    endpoints: () => ({}),
});

export default apiSlice;
