var express = require('express');
const {Rating} = require("../models/cake");
const {Cake} = require("../models/cake");
var router = express.Router();

/* GET users listing. */
// CREATE
router.post('/', async (req, res) => {
    const cake = new Cake({
        url: req.body.url,
        baker: req.body.baker,
        ratings: [],
        // avgRating: -1,
    });

    try {
        const doc = await cake.save()
        res.send(doc)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET ALL
router.get('/', async (req, res) => {
    try {
        const cakes = await Cake.find({}).sort({createdAt: -1});
        res.send(cakes)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET ONE
router.get(`/:id`, async (req, res) => {
    const id = req.params.id;

    try {
        const cake = await Cake.findById(id);

        if (!cake) {
            return res.status(404).send()
        }
        res.send(cake)
    } catch (e) {
        res.status(400).send()
    }
})

// DELETE ONE
router.delete(`/:id`, async (req, res) => {
    const id = req.params.id

    try {
        const cake = await Cake.findOneAndRemove({_id: id});
        if (!cake) {
            return res.status(404).send()
        }
        res.status(200).send(cake)
    } catch (e) {
        res.status(400).send()
    }
})


// UPDATE
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const cake = await Cake.findOneAndUpdate({
            _id: id,
        }, {$set: req.body}, {new: true});

        if (!cake) {
            return res.status(404).send();
        }
        res.send(cake);
    } catch (e) {
        res.status(400).send(e);
    }
})

// UPDATE cake rating
// Add rating object into cake.ratings array
router.patch('/:cakeId/ratings', async (req, res) => {
    const {cakeId} = req.params;

    try {
        const cake = await Cake.findById(cakeId);

        if (!cake) {
            return res.status(404).send();
        }
        cake.ratings.push(req.body);
        const avgRating = getAvgRating(cake);
        cake.avgRating = avgRating;
        cake.save();
        res.send(cake);
    } catch (e) {
        res.status(400).send(e);
    }
});


// DELETE cake rating
// Remove a rating by Id from cake.ratings
router.delete(`/:cakeId/ratings/:ratingId/delete`, async (req, res) => {
    const {cakeId, ratingId} = req.params;
    let avgRating;
    try {
        const cake = await Cake.findById(cakeId);
        cake.ratings.id(ratingId).remove();
        if (cake.ratings.length === 0) {
            avgRating = null;
        } else {
            avgRating = getAvgRating(cake);
        }
        cake.avgRating = avgRating;
        cake.save();
        res.send(cake);
    } catch (e) {
        res.status(400).send(e);
    }
});


const getAvgRating = (cake) => {
    let sum = 0;
    cake.ratings.forEach(rating => {
        sum += rating.stars;
        return sum;
    });

    return (sum / cake.ratings.length).toFixed(2);
};

module.exports = router;
