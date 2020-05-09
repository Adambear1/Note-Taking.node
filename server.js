const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});
// * The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db.json'))
    res.send('ello')
})

// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
    var savedNotes = req.body;
    console.log(savedNotes)
    savedNotes.title = savedNotes.title.replace(/\s+/g, "").toLowerCase();
    fs.readFile('db.json', 'utf-8', (err, data) => {
        var notes = JSON.parse(data);
        notes.push(savedNotes);
        fs.writeFile('db.json', JSON.stringify(notes), (err) => {
            if (err) {
                throw err
            }
            res.json(savedNotes)
        })
    })
})

// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
