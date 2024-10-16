const { Contact } = require("../../models/contact");

const getContacts = async (req, res) => {
  const result = await Contact.find({}, "name email phone");
  res.json(result);
};

module.exports = getContacts;
