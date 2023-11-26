import {useDispatch, useSelector} from 'react-redux';
import {setAuthenticatedStatus, setIsAdmin, setEmail, setId, setName, setPurchasedGames} from './accountSlice.ts';

export const useReduxAccountSliceService = () => {
    const dispatch = useDispatch();
    const accountSlice = useSelector((state) => state.accountSlice);

    const setReduxAccountSliceIsAuthenticatedStatus = (bool: boolean) => {
        try {
            dispatch(setAuthenticatedStatus(bool));
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAccountSliceName = (name: string) => {
        try {
            dispatch(setName(name));
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAccountSliceEmail = (email: string) => {
        try {
            dispatch(setEmail(email));
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAccountSliceId = (id: number) => {
        try {
            dispatch(setId(id));
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAccountSliceIsAdmin = (isAdmin: boolean) => {
        try {
            dispatch(setIsAdmin(isAdmin));
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAccountSlicePurchasedGames = (purchaseGames: any) => {
        try {
            if (getReduxAccountSlicePurchasedGames().length > 0) {
                let purchasedGames = [...getReduxAccountSlicePurchasedGames(), ...purchaseGames];
                dispatch(setPurchasedGames(purchasedGames));
            } else {
                dispatch(setPurchasedGames(purchaseGames));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAccountSlice = (id: number, name: string, email: string, purchasedGames: any) => {
        try {
            // user preference is not added yet
            dispatch(setId(id));
            dispatch(setName(name));
            dispatch(setEmail(email));
            dispatch(setAuthenticatedStatus(true));
            console.log('purchasedGames', purchasedGames);
            let purchasedGamesId = [];
            purchasedGames.forEach((game) => {
                purchasedGamesId.push(game.id);
            });
            console.log('purchasedGamesId', purchasedGamesId);
            dispatch(setPurchasedGames(purchasedGamesId));
        } catch (err) {
            console.log(err);
        }
    };

    const getReduxAuthSliceIsUserAuthenticated = (): boolean => {
        return accountSlice.isAuthenticated;
    };

    const getReduxAccountSliceName = (): string => {
        return accountSlice.name;
    };

    const getReduxAccountSliceEmail = (): string => {
        return accountSlice.email;
    };

    const getReduxAccountSliceId = (): number => {
        return accountSlice.id;
    };

    const getReduxAccountSliceIsAdmin = (): boolean => {
        return accountSlice.isAdmin;
    };

    const getReduxAccountSlice = (): any => {
        return accountSlice;
    };

    const getReduxAccountSlicePurchasedGames = (): any => {
        return accountSlice.purchasedGames;
    };

    return {
        setReduxAccountSliceIsAuthenticatedStatus,
        getReduxAuthSliceIsUserAuthenticated,
        setReduxAccountSliceName,
        getReduxAccountSliceName,
        setReduxAccountSliceEmail,
        getReduxAccountSliceEmail,
        setReduxAccountSliceId,
        getReduxAccountSliceId,
        setReduxAccountSliceIsAdmin,
        getReduxAccountSliceIsAdmin,
        setReduxAccountSlice,
        getReduxAccountSlice,
        setReduxAccountSlicePurchasedGames,
        getReduxAccountSlicePurchasedGames
    };
};
