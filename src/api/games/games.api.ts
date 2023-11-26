import axios from '../axios/axios';

export const useHttpGames = () => {
    const httpGamesGetAllGames = async () => {
        return axios.get('/games/getAllGames').then((response) => {
            return response.data;
        });
    };

    const httpGamesGetGameById = async (gameTO: any) => {
        return axios.post('/games/getGameById', {gameTO}).then((response) => {
            return response.data;
        })
    };

    const httpGamesGetGameByTitle = async (gameTO: any) => {
        return axios.post('/games/getGameByTitle', {gameTO});
    };

    const httpGamesAddGameToUser = async (gameTO: any) => {
        return axios.post('/games/addGameToUser', {gameTO}).then((response) => {
            console.log("response", response)
            return response.data;
        });
    }

    const httpGamesDeleteGameFromUser = async (gameTO: any) => {
        return axios.delete('/games/deleteFromUser', {data: {gameTO}});
    };

    return {httpGamesGetAllGames, httpGamesGetGameById, httpGamesGetGameByTitle, httpGamesDeleteGameFromUser, httpGamesAddGameToUser};
};
