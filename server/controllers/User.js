const User = require('../models/User');

const me = async (req, res) => {
  const id = req.user.id;

  const user = await User.findOne({ id });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    message: 'Success',
    data: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
    },
  });
};

module.exports = {
  me,
};
