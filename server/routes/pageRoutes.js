const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/about", (req, res) => res.render("about"));
router.get("/cncProgrammingInternship", (req, res) => res.render("cncProgrammingInternship"));
router.get("/webDevelopmentInternship", (req, res) => res.render("webDevelopementInternship"));
router.get("/userInterfaceInternship", (req, res) => res.render("userInterfaceInternship"));
router.get("/auth", (req, res) => {
  const formType = req.query.form || "login";
  res.render("auth", { activeForm: formType });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/?logout=success");
});

module.exports = router;

