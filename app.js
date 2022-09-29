const path = require('path');
const express = require('express');
const morgan = require('morgan');

const presetRouter = require('./routes/presetRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const globalErrorController = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

// CLIENT
app.use('/', viewRouter);

// API
app.use('/api/v1/presets', presetRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError('wrong link nig', 404));
});

app.use(globalErrorController);

module.exports = app;
