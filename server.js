const express = require('express');
const app = express();
const port = 3000;

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];




app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}!`);
});



app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number);
    if (!number) {
        res.send("You must specify a number.");
    } else {
        const randomNumber = Math.floor(Math.random() * (number + 1));
        res.send(`You rolled a ${randomNumber}.`);
    }
});




app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const item = collectibles[index];
    if (item) {
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    } else {
        res.send("This item is not yet in stock. Check back soon!");
    }
});




app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;

    // Get query parameters
    const minPrice = parseFloat(req.query['min-price']);
    const maxPrice = parseFloat(req.query['max-price']);
    const type = req.query.type;

    // Filter by min-price
    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }

    // Filter by max-price
    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }

    // Filter by type
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }

    res.send(filteredShoes);
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
