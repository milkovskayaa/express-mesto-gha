const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');

// подключение к базе данных
mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected to MongoDB");
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});