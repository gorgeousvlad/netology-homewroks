const express = require('express');
const cors = require('cors');
const formData = require("express-form-data");

const {Book, filterReqFields} = require('./models/Book');
const store = {
    books: [],
};

[1, 2, 3].map(el => {
    store.books.push(new Book({title: `book ${el}`, description: `book ${el} description`}))
});

const app = express();

app.use(formData.parse());
app.use(cors());

app.post('/api/user/login',(req,res) => {
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books/', (req, res) => {
    const {books} = store;
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json(`book ${id} | not found`);
    }
});

app.post('/api/books/', (req, res) => {
    const {books} = store;
    const book = new Book(filterReqFields(req.body));
    books.push(book);

    res.status(201);
    res.json(book);
});

app.put('/api/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            ...filterReqFields(req.body || {})
        };

        res.json(books[idx]);
    } else {
        res.status(404);
        res.json(`books ${id}| not found`);
    }
});

app.delete('/api/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json(true);
    }  else {
        res.status(404);
        res.json(`book ${id}| not found`);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
