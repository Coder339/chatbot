import { createSlice, nanoid, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store/rootReducers';

// Types

export interface Post {
    id: string,
    userId: number,
    title: string,
    body: string
}
interface PostState {
    loading: boolean
    isSuccess: boolean
    isError: boolean,
    error: any,
    posts: Post[]
}

const initialState: PostState = {
    loading: false,
    isSuccess: false,
    isError: false,
    error: null,
    posts: [],
}


export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (params, thunkAPI) => {
        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/posts'
            );
            let data = await response.json();
            console.log('data posts', data, response.status);

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.loading = false;

            return state;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getPosts.pending, state => {
                state.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                // const newEntities: Record<number, Todo> = {};
                console.log('fetched success', action.payload);

                state.posts = action.payload;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.isError = true
            })
    },
});

// export const postSelector = (state: RootState) => state.posts

export default postSlice.reducer
