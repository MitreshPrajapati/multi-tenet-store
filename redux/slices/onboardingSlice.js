
const { createSlice } = require("@reduxjs/toolkit");

// const initialState = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('onboarding')) || [];
const initialState = {
    currentStep: 1,
    onboardingFormData: {}
}

const onboardingSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        setCurrentStep: (state, action) => {
            // console.log(action.payload)
            state.currentStep = action.payload;
        },
        updateOnboardingFormData: (state, action) => {
            state.onboardingFormData = {
                ...state.onboardingFormData,
                ...action.payload
            }
        },
    }
});

export const {
    setCurrentStep, updateOnboardingFormData
} = onboardingSlice.actions;

export default onboardingSlice.reducer;