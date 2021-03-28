module.exports = {
  privateKey: process.env.PRIVATE_KEY || 'awesomePrivateKey',
  dbLink: process.env.DB_LINK || ':memory:',
  port: process.env.PORT || 1337,
};
