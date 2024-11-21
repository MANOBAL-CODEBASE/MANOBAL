const register = (req, res) => {
  res.status(200).send({ message: req.url });
};

const login = (req, res) => {
  res.status(200).send({ message: req.url });
};

module.exports = { register, login };
