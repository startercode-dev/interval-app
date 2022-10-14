const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log(err.name, '|', err.message);
    process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE_LOCAL;
mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('connected to DB');
    });

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`running at port ${port} ...`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, '|', err.message);
    server.close(() => {
        process.exit(1);
    });
});
