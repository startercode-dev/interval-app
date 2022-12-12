const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const presetRouter = require('./routes/presetRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const globalErrorController = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// GLOBAL MIDDLEWARES **
// DEV LOGGING
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// LIMIT REQUESTS
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Set security HTTP headers
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            'script-src': ["'self'", 'https://unpkg.com/phosphor-icons'],
            'default-src': ["'self'", 'http:', 'ws:'],
            'frame-ancestors': ["'self'", 'https://unpkg.com/phosphor-icons'],
        },
    })
);

// Body & Cookies parser, reading data from body into req.body
app.use(express.json());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(compression());

// TEST MIDDLEWARE
// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString();
//     next();
// });

// CLIENT-SIDE ROUTES **
app.use('/', viewRouter);

// SERVER-SIDE ROUTES **
app.use('/api/v1/presets', presetRouter);
app.use('/api/v1/users', userRouter);

// GLOBAL ERR HANDLER **
app.all('*', (req, res, next) => {
    next(new AppError('wrong link', 404));
});

app.use(globalErrorController);

module.exports = app;
