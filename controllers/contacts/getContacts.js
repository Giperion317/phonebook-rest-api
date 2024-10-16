const { Contact } = require("../../models/contact");

const getContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = getContacts;
