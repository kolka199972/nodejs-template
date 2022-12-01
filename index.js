const chalk = require('chalk')
const {addNote, getNotes, removeNote, editNote} = require('./notes.controller')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Node Simple Server',
    notes: await getNotes(),
    created: false
  })
})

app.post('/', async (req, res) => {
  await addNote(req.body.title)
  res.render('index', {
    title: 'Node Simple Server',
    notes: await getNotes(),
    created: true
  })
})

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id)
  res.render('index', {
    title: 'Node Simple Server',
    notes: await getNotes(),
    created: false
  })
})

app.put('/:id', async (req, res) => {
  await editNote(req.params.id, req.body.text)
  res.render('index', {
    title: 'Node Simple Server',
    notes: await getNotes(),
    created: false
  })
})

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`))
})
