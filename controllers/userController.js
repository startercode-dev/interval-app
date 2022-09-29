const User = require('../models/userModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const crudHandler = require('./crudHandlers');

exports.getUser = crudHandler.getOne(User, { path: 'presets' });

exports.getAllUser = crudHandler.getAll(User);
