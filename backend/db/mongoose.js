const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose
    .connect('mongodb://localhost:27017/cakes', { useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

module.exports = { mongoose };
