const Contact = require("../model/Contact");
const { getPostData } = require("../utils");
const headers = { "Content-Type": "application/json" };
/**
 *
 * @param {*} _
 * @param {*} res
 */
async function getContacts(_, res) {
  try {
    const contacts = await Contact.findAll();
    res.end(JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  }
}
async function getContactById(_, res, id) {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: `Item not found: ${id}` }));
    } else {
      res.writeHead(200, headers);
      res.end(JSON.stringify(contact));
    }
  } catch (error) {
    console.log(error);
  }
}

const createContact = async (req, res) => {
  try {
    const body = await getPostData(req);
    const newContact = await Contact.create(JSON.parse(body));
    res.writeHead(201, headers);
    res.end(JSON.stringify(newContact));
  } catch (error) {
    console.log(error);
    res.end();
  }
};

const updateContact = async (req, res, id) => {
  try {
    const item = Contact.findById(id);
    if (!item) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: `Item not found: ${id}` }));
    } else {
      const body = await getPostData(req);
      const updContact = await Contact.update(id, JSON.parse(body));
      res.writeHead(200, headers);
      res.end(JSON.stringify(updContact));
    }
  } catch (error) {
    console.log(error);
    res.end();
  }
};

const deleteContact = async (_, res, id) => {
  try {
    const item = Contact.findById(id);
    if (!item) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: `Item not found: ${id}` }));
    } else {
      await Contact.remove(id);
      res.writeHead(200, headers);
      res.end(JSON.stringify({ message: `Item deleted: ${id}` }));
    }
  } catch (error) {
    console.log(error);
    res.end();
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
