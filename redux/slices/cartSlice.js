const { createSlice } = require("@reduxjs/toolkit");

const initialState = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, imageUrl, title, salePrice, userId: vendorId } = action.payload;

            const existingItem = state.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                const newItem = {
                    id,
                    imageUrl,
                    title,
                    salePrice,
                    quantity: 1,
                    vendorId,
                };
                state.push(newItem);
                if (typeof window !== 'undefined')
                    localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const newState = state.filter(item => item.id !== id);

            if (typeof window !== 'undefined')
                localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        },
        incrementQty: (state, action) => {
            const id = action.payload;
            const existingItem = state.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;

                if (typeof window !== 'undefined')
                    localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        decrementQty: (state, action) => {
            const id = action.payload;
            const existingItem = state.find(item => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;

                if (typeof window !== 'undefined')
                    localStorage.setItem('cart', JSON.stringify(state));
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