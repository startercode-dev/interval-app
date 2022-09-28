const express = require('express');
const morgan = require('morgan');

const presetRouter = require('./routes/presetRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorController = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/presets', presetRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError('wrong link nig', 404));
});

app.use(globalErrorController);

module.exports = app;
