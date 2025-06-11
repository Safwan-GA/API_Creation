const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/validator');

let users = [
  {
    "id": "1",
    "firstName": "safwan",
    "lastName": "g a",
    "hobby": "Gaming"
  },
  {
    "id": "2",
    "firstName": "safwan",
    "lastName": "g a",
    "hobby": "Gaming"
  },
  {
    "id": "3",
    "firstName": "safwan",
    "lastName": "g a",
    "hobby": "Gaming"
  },
  {
    "id": "4",
    "firstName": "safwan",
    "lastName": "g a",
    "hobby": "Gaming"
  }
];

router.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  res.status(200).json({
    message: 'Welcome to the User API',
    availableEndpoints: {
      getAllUsers: `${baseUrl}/users`,
      getUserById: `${baseUrl}/users/:id`,
      createUser: `${baseUrl}/user`,
      updateUser: `${baseUrl}/user/:id`,
      deleteUser: `${baseUrl}/user/:id`
    }
  });
});


// GET all users
router.get('/users', (req, res) => {
  res.status(200).json(users);
});


// GET user by ID
router.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
});

// POST create new user (Note: changed route to just '/')
router.post('/user', validateUser, (req, res) => {
  const newUser = { id: String(Date.now()), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
router.put('/user/:id', validateUser, (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users[index] = { id: req.params.id, ...req.body };
  res.status(200).json(users[index]);
});

// DELETE user
router.delete('/user/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  const deletedUser = users.splice(index, 1);
  res.status(200).json(deletedUser[0]);
});

module.exports = router;
