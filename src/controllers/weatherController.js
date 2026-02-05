import { getWeatherData } from '../integrations/weatherClient.js';

export const getWeather = async (req, res, next) => {
    try {
        const { city } = req.query;

        if (!city) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a city name'
            });
        }

        const weatherData = await getWeatherData(city);

        res.status(200).json({
            status: 'success',
            data: weatherData
        });
    } catch (err) {
        next(err);
    }
};
