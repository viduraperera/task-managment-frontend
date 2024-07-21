// taskApiSlice.ts
import apiSlice from "../utility/api.slice";

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (task) => ({
                url: '/tasks',
                method: 'POST',
                body: task,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (_, error) =>
                error ? [] : [{ type: "Tasks", id: "LIST" }],
        }),
        getTasks: builder.query({
            query: () => ({
                url: '/tasks',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: () => [{ type: "Tasks", id: "LIST" }],
        }),
        getSingleTasks: builder.query({
            query: ({ id }) => ({
                url: `/tasks/${id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: () => [{ type: "Tasks", id: "LIST" }],
        }),
        updateTask: builder.mutation({
            query: ({ id, ...task }) => ({
                url: `/tasks/${id}`,
                method: 'PUT',
                body: task,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (_, error) =>
                error ? [] : [{ type: "Tasks", id: "LIST" }],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (_, error) =>
                error ? [] : [{ type: "Tasks", id: "LIST" }],
        }),
    }),
});

export const {
    useCreateTaskMutation,
    useGetTasksQuery,
    useGetSingleTasksQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useLazyGetSingleTasksQuery,
} = taskApiSlice;
