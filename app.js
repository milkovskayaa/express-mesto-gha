const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
// подключение к базе данных
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected to MongoDB");
});

const { PORT = 3000 } = process.env;
const app = express();

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});