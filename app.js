const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

// подключение к базе данных
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected to MongoDB");
});


const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '653d2ad447c3b3fa55dd45c1'
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});