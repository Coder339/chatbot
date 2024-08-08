import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: string | number,
    product_name: string,
    price: string,
    isLiked: boolean,
    isDiscounted: boolean,
    discount: number,
    product_detail: string,
    sizes_available: number[],
    images: string[]
}

interface productState {
    loading: boolean
    isSuccess: boolean
    isError: boolean,
    error: any,
    items: Array<any>,
}

interface cartParam {
    id: string
    quantity: number
}

const initialState: productState = {
    loading: false,
    isSuccess: false,
    isError: false,
    error: null,
    items: [],
}

// Asynchronous actions
export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('https://your-api.com/cart');
            const data = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product, thunkAPI) => {
        try {
            const response = await fetch('https://your-api.com/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            const data = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ id, quantity }: cartParam, thunkAPI) => {
        try {
            const response = await fetch(`https://your-api.com/cart/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity })
            });
            const data = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (id: string, thunkAPI) => {
        try {
            const response = await fetch(`https://your-api.com/cart/${id}`, {
                method: 'DELETE'
            });
            return { id };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.items.push(action.payload);
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index].quantity = action.payload.quantity;
                }
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload.id);
            });
    },
});

export default cartSlice.reducer;
