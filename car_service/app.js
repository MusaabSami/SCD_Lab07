const express = require('express');
const cars = require('./cars');

const app = express();
app.use(express.json());

const PORT = 3002;

// Routes
app.post('/cars', cars.addCar);
app.get('/cars/:carId', cars.getCar);
app.put('/cars/:carId', cars.updateCar);

app.listen(PORT, () => {
  console.log(`Car Service running on port ${PORT}`);
});