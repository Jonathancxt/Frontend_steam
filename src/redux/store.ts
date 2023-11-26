import {configureStore} from '@reduxjs/toolkit';
import accountReducer from './slices/account/accountSlice.ts';

export const store = configureStore({
    reducer: {
        accountSlice: accountReducer,
    }
});
