const express = require('express')
require('express-async-errors');
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const notesRouter = require('./controllers/notes')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const readinglistRouter = require('./controllers/readinglist')
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/readinglist', readinglistRouter)
const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()