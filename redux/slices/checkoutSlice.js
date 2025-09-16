
const { createSlice } = require("@reduxjs/toolkit");

// const initialState = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('checkout')) || [];
const initialState = {
    currentStep: 1,
    checkoutFormData: {}
}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setCurrentStep: (state, action) => {
            // console.log(action.payload)
            state.currentStep = action.payload;
        },
        updateCheckoutFormData: (state, action) => {
            state.checkoutFormData = {
                ...state.checkoutFormData,
                ...action.payload
            }
        },
    }
});

export const {
    setCurrentStep, updateCheckoutFormData
} = checkoutSlice.actions;

export default checkoutSlice.reducer;