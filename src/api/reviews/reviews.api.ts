import axios from "../axios/axios"


export const useHttpReviews = () => {
    const httpReviewsAddReview = async (reviewTO: any) => {
        return axios.post('/reviews/create', {reviewTO})
    }

    const httpReviewsDeleteReview = async (reviewTO: any) => {
        return axios.post('/reviews/delete', {reviewTO})
    }

    const httpReviewsUpdateReview = async (reviewTO: any) => {
        console.log("reviewTO", reviewTO)
        return axios.post('/reviews/update', {reviewTO})
    }

    const httpReviewsGetReviewsByGameId = async (reviewTO: any) => {
        return axios.post('/reviews/getAllReviewByGameId', {reviewTO})
    }

    return {httpReviewsAddReview, httpReviewsDeleteReview, httpReviewsUpdateReview, httpReviewsGetReviewsByGameId}
}
