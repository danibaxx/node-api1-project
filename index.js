// implement your API here
const express = require('express')
const db = require('./data/db');

const app = express()

app.use(express.json())

// init GET req
app.get('/', (req, res) => {
  console.log('ip:', req.ip)
  res.json({ 
    message:'Welcome to the API!' 
  })
})

// GET req to users
app.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users)
    })

    .catch(error => {
      res.status(500).json({ 
        errorMessage: "The users information could not be retrieved." 
      })
    })
})

// GET req to users by id
app.get('/api/users/:id', (req, res) => {
  const user = req.params.id;

  db.findById(user)
    .then(data => {
      if (data) {
        res.json(data)
      } else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'The user information could not be retrieved'
      })
  })
})

app.post('/api/users', (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.bio) {
    return res.status(400).json({ 
      errorMessage: 'Please provide name and bio for the user.' 
    })
  } else {
    db.insert(newUser)
      .then(res => {
        res.status(201).json(res)
      })
      .catch(error => {
        res.status(500).json({ 
          errorMessage: 'There was an error while saving the user to the database' 
        })
      })
    }
})

app.delete('/api/users/:id', (req, res) => {
  const user = req.params.id;
  if (user) {
    db.remove(user)
      .then(rm => {
        res.status(200).json(rm)
      })
    } else {
      res.status(404).json({
        errorMessage: 'The user with the specified ID does not exist'
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: 'The user could not be removed'
        })
      })
  }
})

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running http://${hostname}:${port}/api`)
})