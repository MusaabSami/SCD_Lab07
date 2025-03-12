const axios = require('axios');

let bookings = [];

module.exports = {
  createBooking: async (req, res) => {
    const { userId, carId, startDate, endDate } = req.body;

    // Check user's active bookings
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    const user = userResponse.data;
    if (user.activeBookings >= user.maxBookings) {
      return res.status(400).json({ message: 'User has reached the booking limit' });
    }

    // Check car availability
    const carResponse = await axios.get(`http://localhost:3002/cars/${carId}`);
    const car = carResponse.data;
    if (!car.isAvailable) {
      return res.status(400).json({ message: 'Car is not available' });
    }

    // Create booking
    const newBooking = {
      bookingId: bookings.length + 1,
      userId,
      carId,
      startDate,
      endDate,
      status: 'active',
    };
    bookings.push(newBooking);

    // Update user's active bookings
    await axios.put(`http://localhost:3001/users/${userId}`, {
      activeBookings: user.activeBookings + 1,
    });

    // Update car's availability
    await axios.put(`http://localhost:3002/cars/${carId}`, {
      isAvailable: false,
    });

    res.status(201).json(newBooking);
  },

  getUserBookings: (req, res) => {
    const { userId } = req.params;
    const userBookings = bookings.filter((b) => b.userId === parseInt(userId));
    res.json(userBookings);
  },

  cancelBooking: async (req, res) => {
    const { bookingId } = req.params;
    const booking = bookings.find((b) => b.bookingId === parseInt(bookingId));
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update user's active bookings
    const userResponse = await axios.get(`http://localhost:3001/users/${booking.userId}`);
    const user = userResponse.data;
    await axios.put(`http://localhost:3001/users/${booking.userId}`, {
      activeBookings: user.activeBookings - 1,
    });

    // Update car's availability
    await axios.put(`http://localhost:3002/cars/${booking.carId}`, {
      isAvailable: true,
    });

    // Update booking status
    booking.status = 'canceled';
    res.json(booking);
  },
};


