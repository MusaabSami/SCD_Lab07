const express = require('express');
const bookings = require('./bookings');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = 3003;

// Routes
app.post('/bookings', bookings.createBooking);
app.get('/bookings/:userId', bookings.getUserBookings);
app.delete('/bookings/:bookingId', bookings.cancelBooking);

app.listen(PORT, () => {
  console.log(`Booking Service running on port ${PORT}`);
});