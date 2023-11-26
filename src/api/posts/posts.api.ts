import axios from '../axios/axios';
export const useHttpPosts = () => {
    const httpPostsCreatePost = async (postsTO) => {
return axios.post('/posts/create', { postsTO }).then((response) => {
            return response.data;
        });
    }

    const httpPostsGetAllPosts = async () => {
        return axios.get('/posts/getAllPosts').then((response => {
            return response.data;
        }));
    }

    const httpPostsGetPostsViaPagination = async (postsTO) => {
        return axios.post('/posts/getPostsViaPagination', { postsTO } ).then((response) => {
            return response.data;
        });
    }

    return { httpPostsCreatePost, httpPostsGetAllPosts, httpPostsGetPostsViaPagination };
}
