// src/apiService.js
import axiosInstance from '../helpers/AxiosInstance/axiosInstance';

export const login = async (email, password) => {
    try {
        console.log('TRYNA LOGIN', email, password)
        const response = await axiosInstance.post('/login/', { email, password });
        console.log('response', response)
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getPlots = async (user_id, token) => {
    try {
        console.log('TRYNA get plots', user_id, token);
        const response = await axiosInstance.get(`/plots/${user_id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        console.log('response', response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};




// Add more API functions as needed