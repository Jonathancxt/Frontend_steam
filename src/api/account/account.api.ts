import axios from '../axios/axios';

export const useHttpAccount = () => {
    const httpAccountSignup = async (signUpTO:any) => {
        return axios
            .post('/account/signup', {signUpTO})
            .then((response) => {
                console.log(response)
                return true
            })
            .catch((err) => {
                console.log(err)
                throw new Error(err.message);
            });
    };

    const httpAccountLogin = (loginTO:any) => {
        return axios
            .post('/account/login', {loginTO})
            .then((response) => {
                return response.data
            })

            .catch((err) => {
                throw new Error(err.message);
            });
    };

    const httpAccountGetUserByEmail = (accountTO) => {
        return axios.post('/account/getUserByEmail', {accountTO})
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                throw new Error(err.message);
            });
    }

    return {httpAccountLogin, httpAccountSignup, httpAccountGetUserByEmail}
};
