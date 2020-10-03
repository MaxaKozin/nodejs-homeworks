const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Incognito",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      required: true,
      default: "free",
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

class Contacts {
  constructor() {
    this.db = mongoose.model("Contacts", contactSchema);
  }

  getContacts = async (query) => {
    return this.db.find(query);
  };

  addContact = async (contact) => {
    return await this.db.create(contact);
  };

  getContactById = async (contactId) => {
    return this.db.findById(contactId);
  };

  deleteContact = async (contactId) => {
    return this.db.findByIdAndRemove(contactId);
  };

  updateContact = async (contactId, newData) => {
    return this.db.findByIdAndUpdate(contactId, newData, { new: true });
  };
}

module.exports = new Contacts();
