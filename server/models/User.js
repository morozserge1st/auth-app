const sqlite3 = require('sqlite3').verbose();

const { dbLink } = require('../config');

const db = new sqlite3.Database(dbLink, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    const sql = `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email text,
      password text, 
      full_name text
    )`;
    db.run(sql, (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      }
    });
  }
});

const create = (data) => {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      const sql = 'INSERT INTO users (email, password, full_name) VALUES (?,?,?)';
      const params = [data.email, data.password, data.fullName];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err.message);
        }

        resolve({
          id: this.lastID,
          email: data.email,
          fullName: data.fullName,
        });
      });
    });
  });
};

const findOne = ({ id, email }) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      const sql = 'SELECT * FROM users WHERE id=? OR email=?';
      const params = [id, email];

      db.get(sql, params, (err, row) => {
        if (err) {
          reject(err.message);
        }
        resolve(row);
      });
    });
  });
};

module.exports = {
  create,
  findOne,
};
