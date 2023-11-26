import {createSlice} from '@reduxjs/toolkit';

export const accountSlice = createSlice({
    name: 'accountSlice',
    initialState: {
        name: '',
        email: '',
        isAuthenticated: false,
        id: 0,
        isAdmin: false,
        purchasedGames: [],
    },
    reducers: {
        setAuthenticatedStatus: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        setPurchasedGames: (state, action) => {
            state.purchasedGames = action.payload;
        }
    }
});

export default accountSlice.reducer;
export const {setAuthenticatedStatus, setName,setId,setEmail,setIsAdmin,setPurchasedGames} = accountSlice.actions;
