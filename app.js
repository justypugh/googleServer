const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const playstore = require('./playstore.js');

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/apps', (req, res) => {
    const { search = "", sort, genres } = req.query;

    if(sort) 
        if (!['rating', 'app'].includes(sort)) {
            return res 
                .status(400)
                .send('Sort must be one of rating or app');
        }

        let results = playstore
            .filter(App => 
                App
                .App
                .toLowerCase()
                .includes(search.toLowerCase()));

        if (sort === 'app') {
            results
                .sort((a, b) => {
                    return a[results] > b[results] ? 1 : a[results] < b[results] ? -1 : 0;
                });
        } else if (sort === 'rating') {
            results 
                .sort((a, b) => {
                    return a['Rating'] - b['Rating'];
                });
        }

    if(genres) 
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res 
                .status(400)
                .send('Genres must be either Action, Puzzle, Strategy, Casual, Arcade, or Card');
        } else {
            results = results.filter(element => {
                return element.Genres.toLowerCase() === genres.toLowerCase();
            });
        }

    res 
        .status(200)
        .json(results);
});

module.exports = app;