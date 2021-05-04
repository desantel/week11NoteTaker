const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        //routes

        //gets /api/notes route
        app.get('/api/notes', function(req, res) {
            res.json(notes);
        });

        //posts route
        app.post('/api/notes', function(req, res) {
            let newInput = req.body;
            notes.push(newInput);
            updateDb();
            return console.log(`Added new note: ${newInput.title}`);
        });

        //gets note with particular id
        app.get('/api/notes/:id', function(req, res) {
            res.json(notes[req.params.id]);
        });

        //deletes note with particular id
        app.delete('/api/notes/:id', function (req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log(`Deleted note with id ${req.params.id}`)
        });

        //pulls up notes.html
        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, '../public/notes.html'))
        });

        //pulls up index.html
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        //updates db.json with additions or deletions
        function updateDb() {
            fs.writeFile('./db/db.json', JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}