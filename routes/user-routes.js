const router = require("express").Router();
const { User } = require("../models");

// get all users

router.get("/", (req, res) => {});

// get single user
router.get("/:id", (req, res) => {});

// create new user
router.post("/", (req, rest) => {});

// update user, UPDATE using ID
router.put(":id", (req, res) => {});

// delete user using id
router.delete("/:id", (req, res) => {});

module.exports = router;
