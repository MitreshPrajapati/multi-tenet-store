const { createSlice } = require("@reduxjs/toolkit");

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, imageUrl, title, salePrice } = action.payload;

            const existingItem = state.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.push({
                    id,
                    imageUrl,
                    title,
                    salePrice,
                    quantity: 1
                });
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            return state.filter(item => item.id !== id);
        },
        incrementQty: (state, action) => {
            const id = action.payload;
            const existingItem = state.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decrementQty: (state, action) => {
            const id = action.payload;
            const existingItem = state.find(item => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else if (existingItem && existingItem.quantity === 1) {
                return state.filter(item => item.id !== id);
            }
        },
    }
});

export const {
    addToCart, removeFromCart, incrementQty, decrementQty
} = cartSlice.actions;

export default cartSlice.reducer;