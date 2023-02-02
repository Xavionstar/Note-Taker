const express = require('express')
const path = require('path')
const app = express()
const fs = require("fs")
const { json } = require('express')
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.static("public"));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log('here')
    res.render('index')
})


app.get('/notes', (req, res) => {
    console.log('')
    res.render('notes')
})

app.get('/api/notes', (req, res) => {

    res.json(getDatabaseContent())
})

app.post('/api/notes', (req, res) => {
    let notes = getDatabaseContent()


    let nextId = "0"
    if(notes.length > 0){
        const notesLastIndex = notes.length - 1;
        let lastNoteInNotes = notes[notesLastIndex];
        nextId = lastNoteInNotes.id
    }


    let newNote = req.body
    newNote.id = id


    notes.push(req.body)
    saveDatabaseContent(notes)
    res.json(req.body)

})

function getDatabaseContent() {
    let notes = fs.readFileSync(__dirname + "/db/db.json", {
        encoding: 'utf-8',
    });
    notes = JSON.parse(notes)
    console.log(notes);
    return notes
}

function saveDatabaseContent(notes) {
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(notes))
}

app.listen(PORT, ( ) =>{
    console.log(`server running on ${PORT}`)
})