let cars = [];

module.exports = {
  addCar: (req, res) => {
    const { model, location } = req.body;
    const newCar = {
      carId: cars.length + 1,
      model,
      location,
      isAvailable: true,
    };
    cars.push(newCar);
    res.status(201).json(newCar);
  },

  getCar: (req, res) => {
    const { carId } = req.params;
    const car = cars.find((c) => c.carId === parseInt(carId));
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  },

  updateCar: (req, res) => {
    const { carId } = req.params;
    const { isAvailable } = req.body;
    const car = cars.find((c) => c.carId === parseInt(carId));
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    car.isAvailable = isAvailable;
    res.json(car);
  },
};