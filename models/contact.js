const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be exist"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email must be exist"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Phone must be exist"],
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const schemas = { addSchema };

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
