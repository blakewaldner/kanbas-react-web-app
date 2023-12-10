import axios from "axios";
const request = axios.create({
    withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;
export const quiz = async () => {
    const response = await request.post(`${QUIZZES_API}/quiz`);
    return response.data;
  };
export const createQuiz = async (quiz) => {
    const response = await request.post(`${QUIZZES_API}`, quiz);
    return response.data;
};
export const findAllQuizzes = async () => {
    const response = await request.get(`${QUIZZES_API}`);
    return response.data;
};
export const findQuizById = async (id) => {
    const response = await request.get(`${QUIZZES_API}/${id}`);
    return response.data;
};
export const deleteQuiz = async (quiz) => {
    const response = await request.delete(
        `${QUIZZES_API}/${quiz._id}`);
    return response.data;
};
export const updateQuiz = async (quiz) => {
    const response = await request.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};