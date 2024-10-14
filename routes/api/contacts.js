const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validationBody } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

// router.get("/", ctrlWrapper(ctrl.getContacts));

// router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);

// router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

// router.put(
//   "/:contactId",
//   validationBody(schemas.contactAddSchema),
//   ctrlWrapper(ctrl.updateContact)
// );

module.exports = router;
