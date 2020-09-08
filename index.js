// const argv = require("yargs").argv;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./contacts");

const app = express();
const PORT = 3000;
const path = "/contacts";

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.get(`${path}`, async (req, res) => {
  const response = await listContacts().then((data) => JSON.parse(data));
  res.set("Content-Type", "application/json");
  res.statusCode = 200;
  res.json(response);
});

app.get(`${path}/:contactId`, async (req, res) => {
  const { contactId } = req.params;
  const err = {
    message: "Not found",
  };
  const response = await getContactById(contactId);
  if (response) {
    res.statusCode = 200;
    res.send(response);
    return;
  }
  res.statusCode = 404;
  res.send(err);
});

app.post(`${path}`, async (req, res) => {
  const body = req.body[0];
  const { name, email, phone } = body;
  console.log(name);

  if (name && email && phone) {
    addContact(name, email, phone)
      .then((data) => {
        res.statusCode = 201;
        res.send(data);
      })
      .catch((err) => console.log(err.message));
    return;
  }
  if (!name || !email || !phone) {
    let response = "";
    if (!name) response = "name";
    if (!email) response = "email";
    if (!phone) response = "phone";
    const err = {
      message: `missing required ${response} field`,
    };
    res.statusCode = 404;
    res.send(err);
  }
});

app.delete(`${path}/:contactId`, async (req, res) => {
  const { contactId } = req.params;
  const err = {
    message: "Not found",
  };
  const success = {
    message: "contact deleted",
  };
  const response = await removeContact(contactId);
  if (response) {
    res.statusCode = 200;
    res.send(success);
    return;
  }
  res.statusCode = 404;
  res.send(err);
});

app.patch(`${path}/:contactId`, async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  console.log("name: ", name, "email: ", email, "phone: ", phone);
  const missing = {
    message: "missing fields",
  };
  const err = {
    message: "Not found",
  };

  if (!name && !email && !phone) {
    res.statusCode = 400;
    res.send(missing);
    return;
  }

  const response = await updateContact(contactId, name, email, phone);
  if (!response) {
    res.statusCode = 404;
    res.send(err);
    return;
  }

  res.statusCode = 200;
  res.send(response);
});

app.listen(PORT, () => {
  console.log("Server is working on port: ", PORT);
});

// function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case "list":
//       listContacts();
//       break;

//     case "get":
//       getContactById(id);
//       break;

//     case "add":
//       addContact(name, email, phone);
//       break;

//     case "remove":
//       removeContact(id);
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// invokeAction(argv);
