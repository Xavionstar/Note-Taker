const express = require('express')
const path = require('path')
const app = express()
const fs = require("fs")
const { json } = require('express')
const PORT = process.env.PORT || 3000;

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
        let lastNote = notes[notesLastIndex];
        nextId = lastNote.id
    }


    let newNote = req.body
    newNote.id = nextId


    notes.push(newNote)
    saveDatabaseContent(notes)
    res.json(newNote)

})


function getDatabaseContent() {
    let notes = fs.readFileSync(__dirname + "/db/db.json", {
        encoding: 'utf-8',
    });
    notes = JSON.parse(notes)
    return notes
}

function saveDatabaseContent(notes) {
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(notes))
}

app.listen(PORT, ( ) =>{
    console.log(`server running on ${PORT}`)
})