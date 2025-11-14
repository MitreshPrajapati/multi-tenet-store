import { configureStore, } from "@reduxjs/toolkit";
import cartSlice from './slices/cartSlice'
import checkoutSlice from './slices/checkoutSlice';
import onboardingSlice from './slices/onboardingSlice'


export const store = configureStore({
    reducer: {
        cart: cartSlice,
        checkout: checkoutSlice,
        onboarding: onboardingSlice,
    },
})