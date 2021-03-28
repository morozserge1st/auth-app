// TODO: change to redis

const BLACK_LIST = [];

const add = (token) => {
  BLACK_LIST.push(token);
};

const find = (token) => BLACK_LIST.includes(token);

module.exports = {
  add,
  find,
};
