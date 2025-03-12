let users = [];

module.exports = {
  registerUser: (req, res) => {
    const { name, email } = req.body;
    const newUser = {
      userId: users.length + 1,
      name,
      email,
      maxBookings: 3,
      activeBookings: 0,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  },

  getUser: (req, res) => {
    const { userId } = req.params;
    const user = users.find((u) => u.userId === parseInt(userId));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  },

  updateUser: (req, res) => {
    const { userId } = req.params;
    const { activeBookings } = req.body;
    const user = users.find((u) => u.userId === parseInt(userId));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.activeBookings = activeBookings;
    res.json(user);
  },
};