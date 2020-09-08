const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  return await fs.readFile(contactsPath, "utf-8"));
}

async function getContactById(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const response = [];
  const foundContact = JSON.parse(contacts).find(({ id }) => id == contactId);
  if (foundContact) {
    response.push(foundContact);
    return response;
  }
}

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const filteredContacts = JSON.parse(contacts).filter(
    ({ id }) => id != contactId
  );
  const contactExist = JSON.parse(contacts).some(({ id }) => id == contactId);
  if (!contactExist) {
    console.log(`Contact with id: ${contactId} was not found`);
    return;
  }
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return true;
}

async function addContact(name, email, phone) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const contactsList = JSON.parse(contacts);
  const contact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  contactsList.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return contact;
}

async function updateContact(id, name, email, phone) {
  const response = await getContactById(id);
  if (!response) {
    return;
  }

  if (name) response[0].name = name;
  if (email) response[0].email = email;
  if (phone) response[0].phone = phone;

  const contacts = await fs.readFile(contactsPath, "utf-8");
  const parsedContacts = JSON.parse(contacts);
  const filteredContacts = parsedContacts.filter((contact) => contact.id != id);
  filteredContacts.push(response[0]);

  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return response[0];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
