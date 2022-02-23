### Homeworks for netology nodejs backend studies

### Library requests

#### Add books

```javascript
db.books.insertMany([
    {title: 'book1', description: 'book1_desc', authors: "book1_author"},
    {title: 'book2', description: 'book2_desc', authors: "book2_author"},
]);
```

#### Find book

```javascript
db.books.find([
    {title: 'book_title'}
]);
```

#### Update book

```javascript
db.books.updateOne([
    {_id: 'book_id'},
    {$set: {description: 'new_description', authors: 'new_authors'}}
]);