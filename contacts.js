const fs = require("fs").promises;
const path = require("path");

contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((contacts) => console.table(JSON.parse(contacts)))
    .catch((err) => console.log(err.message));
}

async function getContactById(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const foundContact = JSON.parse(contacts).find(({ id }) => id === contactId);
  if (foundContact) {
    console.table(foundContact);
    return;
  }
  console.log(`Contact with id: ${contactId} is not found`);
}

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const filteredContacts = JSON.parse(contacts).filter(
    ({ id }) => id !== contactId
  );
  const contactExist = JSON.parse(contacts).some(({ id }) => id === contactId);
  if (!contactExist) {
    console.log(`Contact with id: ${contactId} was not found`);
    return;
  }
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts)).then(() => {
    console.log(`Contact with id: ${contactId} was successfully removed`);
    console.table(filteredContacts);
  });
}

async function addContact(name, email, phone) {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const contactsList = JSON.parse(contacts);
  const id = contactsList.length > 0 ? [...contactsList].pop().id + 1 : 1;
  const contact = {
    id,
    name,
    email,
    phone,
  };
  contactsList.push(contact);
  fs.writeFile(contactsPath, JSON.stringify(contactsList)).then(() =>
    console.table(contactsList)
  );
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
