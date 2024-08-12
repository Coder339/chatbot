import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../store/rootReducers';
import { API_BASE_URL } from '../../utils/urls';
import { KEYCHAIN } from '../../utils/keychain';
// import DATA from '../../products.json';

interface Recipe {
    id: string,
    userId: number,
    image: string,
    imageType: string
}

interface recipeState {
    loading: boolean
    isSuccess: boolean
    isError: boolean,
    error: any,
    recipes: Array<any>,
    favourites: Array<any>
}
const initialState: recipeState = {
    loading: false,
    isSuccess: false,
    isError: false,
    error: null,
    recipes: [],
    favourites: []
}

export const getRecipes = createAsyncThunk(
    'recipe/getRecipes',
    async (query: string, thunkAPI) => {
        console.log('PARAMS', query);

        try {
            const response = await fetch(`${API_BASE_URL}complexSearch?apiKey=${KEYCHAIN.SPOONACULAR_API_KEY}&query=${query}&number=50&offset=0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                }
            })
            let data = await response.json();
            console.log('data RECIPES', data, response.status);

            if (response.status === 200) {
                return data?.results;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e: any) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        likeRecipe: (state, action) => {
            console.log('log111111', action.payload);

            const recipe = state.recipes.find(p => p.id === action.payload.id);
            if (recipe) {
                recipe.isLiked = true;
                state.favourites.push(recipe);
            }
        },
        dislikeRecipe: (state, action) => {
            const recipe = state.recipes.find(p => p.id === action.payload.id);
            if (recipe) {
                recipe.isLiked = false;
                state.favourites = state.favourites.filter(p => p.id !== action.payload.id);
            }
        },

    },
    extraReducers: builder => {
        builder
            .addCase(getRecipes.pending, state => {
                state.loading = true;
            })
            .addCase(getRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                // const newEntities: Record<number, Todo> = {};
                console.log('fetched success', action.payload);

                state.recipes = action.payload;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(getRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.isError = true
            })
    },
})

// export const todoSelector = (state: RootState) => state.todos

export const { likeRecipe, dislikeRecipe } = recipeSlice.actions

export default recipeSlice.reducer