const yup = require('yup');

const fullName = yup.string().min(1);

const password = yup.string().min(8).matches(/[a-z]/i).matches(/\d/);

const email = yup.string().email();

const validateData = async (data) => {
  const isValidEmail = await email.isValid(data.email);
  const isValidPassword = await password.isValid(data.password);
  const isValidFullName = await fullName.isValid(data.fullName);

  const errors = [];

  if (!isValidEmail) {
    errors.push({
      message: 'Invalid email',
    });
  }

  if (!isValidPassword) {
    errors.push({
      message: 'Invalid password. Expected a minimum of 8 characters with at least one number and one letter',
    });
  }

  if (!isValidFullName) {
    errors.push({
      message: 'Invalid full name. Expected a minimum of 1 characters',
    });
  }

  return errors;
};

module.exports = {
  validateData,
};
