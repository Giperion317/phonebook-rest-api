const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
  // const [contactById] = contacts.filter(({ id }) => id === contactId);
  // return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  const [result] = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  // const [removedContact] = contacts.filter(({ id }) => id === contactId);
  // if (removedContact) {
  //   const newContacts = contacts.filter(({ id }) => id !== contactId);
  //   fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  // }
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  const { name, email, phone } = body;
  const id = contactId;
  contacts[contactIdx] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIdx];
  // const [changedContact] = contacts.filter(({ id }) => id === contactId);

  // if (changedContact) {
  //   const { name, email, phone } = body;
  //   if (name) changedContact.name = name;
  //   if (email) changedContact.email = email;
  //   if (phone) changedContact.phone = phone;
  //   const changedContactIndex = contacts.indexOf(changedContact);
  //   contacts[changedContactIndex] = changedContact;
  //   fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  // }
  // return changedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
