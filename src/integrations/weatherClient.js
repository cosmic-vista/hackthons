import axios from 'axios';
import axiosRetry from 'axios-retry';
import AppError from '../utils/AppError.js';

const weatherClient = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    timeout: 5000
});

axiosRetry(weatherClient, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.response && error.response.status >= 500);
    }
});

export const getWeatherData = async (city) => {
    try {
        const response = await weatherClient.get('/weather', {
            params: {
                q: city,
                appid: process.env.WEATHER_API_KEY,
                units: 'metric'
            }
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new AppError('Invalid Weather API Key', 503);
        }
        throw new AppError('Failed to fetch weather data', 503);
    }
};
