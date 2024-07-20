import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // Adjust this to match your backend base URL
    prepareHeaders: (headers, { getState }) => {
        // Optionally, set any additional headers here
        headers.set('noAuth', 'TRUE'); // Set noAuth header
        return headers;
    },
});

const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Tasks'],
    endpoints: () => ({}),
});

export default apiSlice;
