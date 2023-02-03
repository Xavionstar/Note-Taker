const express = require('express')
const path = require('path')
const app = express()
const fs = require("fs")
const { json } = require('express')
const PORT = process.env.PORT || 3000;
//these functions tell the app to parse in json and set up the public folder
app.use(express.json())
app.use(express.static("public"));
//I set up this view engine that i found by googling because it is close to HTML
app.set('view engine', 'ejs')
//this route gets the home page
app.get('/', (req, res) => {
    
    res.render('index')
})

//this route gets the second page
app.get('/notes', (req, res) => {
    console.log('')
    res.render('notes')
})
//i set up functions to get the database content and parse it into json
app.get('/api/notes', (req, res) => {

    res.json(getDatabaseContent())
})

app.post('/api/notes', (req, res) => {
    let notes = getDatabaseContent()

//I had to create ids because it was not changing when i clicked a note
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
//this function tells it which port to listen to
app.listen(PORT, ( ) =>{
    console.log(`server running on ${PORT}`)
})