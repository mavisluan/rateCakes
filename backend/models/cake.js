const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
        stars: {
            type: Number,
            required: [ true, "Rate is required"],
        },
        comment: {
            type: String,
            required: [true, "Comment is required."],
            minlength: [2, "Comment must be more than 2 characters"]
        },
    },
    {timestamps: true}
);

const CakeSchema = new mongoose.Schema({
        url: {
            type: String,
            required: [ true, "imageUrl is required"],
            minlength: [2, "imageUrl must be more than 2 characters"]
        },
        baker: {
            type: String,
            required: [true, "Baker is required."],
            minlength: [3, "Baker must be more than 3 characters"]
        },
        avgRating: Number,
        ratings: [RatingSchema],
    },
    {timestamps: true}
);

// Create collection and add schema
const Rating = mongoose.model('Rating', RatingSchema);
// Create collection and add schema
const Cake = mongoose.model('Cake', CakeSchema);
module.exports = { Rating, Cake };
