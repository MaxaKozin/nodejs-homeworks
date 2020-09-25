const ContactsDB = require("./contacts.model");

const getController = async (req, res, next) => {
  try {
    const { query } = req;
    const contacts = await ContactsDB.getContacts(query);
    res.status(200).json(contacts);
  } catch (e) {
    next(e);
  }
};

const addController = async (req, res, next) => {
  try {
    const { body } = req;
    const newContact = await ContactsDB.addContact(body);
    res.status(201).json(newContact);
  } catch (e) {
    next(e);
  }
};

const getByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactsDB.getContactById(contactId);
    res.status(200).json(contact);
  } catch (e) {
    next(e);
  }
};

const removeController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await ContactsDB.deleteContact(contactId);
    res.end();
  } catch (e) {
    next(e);
  }
};

const updateController = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const updatedContact = await ContactsDB.updateContact(id, data);
    res.status(201).json(updatedContact);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getController,
  addController,
  getByIdController,
  removeController,
  updateController,
};
