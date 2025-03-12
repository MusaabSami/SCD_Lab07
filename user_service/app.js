const express = require('express');
const users = require('./users');

const app = express();
app.use(express.json());

const PORT = 3001;

// Routes
app.post('/users', users.registerUser);
app.get('/users/:userId', users.getUser);
app.put('/users/:userId', users.updateUser);

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});