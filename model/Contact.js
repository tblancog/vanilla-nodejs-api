let items = require("../data/data.json");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(items);
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    resolve(items.filter((item) => item._id === id)[0]);
  });
};

const create = (item) => {
  return new Promise((resolve, reject) => {
    const newItem = {
      _id: uuidv4(),
      ...item,
    };
    items.push(newItem);
    writeDataToFile("./data/data.json", items);
    resolve(newItem);
  });
};

const update = (id, item) => {
  return new Promise((resolve, reject) => {
    const index = items.findIndex((item) => item._id === id);
    items[index] = { _id: id, ...items[index], ...item };
    writeDataToFile("./data/data.json", items);
    resolve(items[index]);
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    items = items.filter((item) => item._id != id);
    writeDataToFile("./data/data.json", items);
    resolve();
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
