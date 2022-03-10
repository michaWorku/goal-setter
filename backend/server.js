const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const path = require("path");
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 8000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(PORT, ()=>console.log(`server started on port ${PORT}`))