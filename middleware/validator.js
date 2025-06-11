const validateUser = (req, res, next) => {
  const { firstName, lastName, hobby } = req.body;
  let missingFields = [];
  
  if (!firstName) missingFields.push('firstName');
  if (!lastName) missingFields.push('lastName');
  if (!hobby) missingFields.push('hobby');
  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
  }
  next();
};

module.exports = validateUser;
