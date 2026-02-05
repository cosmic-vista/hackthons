import './config/env.js';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/db.js';
import './config/passport.js';
import './config/redis.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import AppError from './utils/AppError.js';

connectDB();

const app = express();

app.use(passport.initialize());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api', limiter);

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the Farmlok Backend API',
        endpoints: {
            auth: {
                login: '/auth/google',
                me: '/auth/me'
            },
            products: {
                all: '/api/v1/products',
                single: '/api/v1/products/:id'
            },
            weather: {
                search: '/api/v1/weather?city={cityName}'
            },
            system: {
                health: '/health'
            }
        }
    });
});
app.use('/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/weather', weatherRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime()
    });
});

app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

export default app;
