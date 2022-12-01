const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString()
  }
  notes.push(note)
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.bgBlue('Here is the list of notes:'))
  notes.forEach((note) => console.log(chalk.blue(`${note.id} ${note.title}`)))
}

async function removeNote(id) {
  const notes = await getNotes()

  const newNotes = notes.filter((note) => note.id !== id)
  await fs.writeFile(notesPath, JSON.stringify(newNotes))
  if (notes.length === newNotes.length) {
    console.log(chalk.bgRed("Note wasn't found"))
    return
  }
  console.log(chalk.bgGreen('Note was removed!'))
}

async function editNote(id, text) {
  const notes = await getNotes()

  const newNotes = notes.map((n) => {
    if (n.id === id) {
      return {...n, title: text}
    } else {
      return n
    }
  })
  await fs.writeFile(notesPath, JSON.stringify(newNotes))
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote
}
