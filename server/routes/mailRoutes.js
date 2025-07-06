const express = require("express");
const router = express.Router();

const { sendInquiryEmail } = require("../controller/inquiryFormController.js");
const { sendWebDevRegEmail } = require("../controller/webDevelopmentRegController.js");
const { sendCNCProgrammingRegEmail } = require("../controller/cncProgrammingRegController.js");
const { sendUserInterfaceRegEmail } = require("../controller/userInterfaceRegController.js");

router.post("/inquiry", sendInquiryEmail);
router.post("/web-dev-registration", sendWebDevRegEmail);
router.post("/cnc-programming-registration", sendCNCProgrammingRegEmail);
router.post("/user-interface-registration", sendUserInterfaceRegEmail);

module.exports = router;
