const router = require("express").Router();
const { User } = require("../../models");

// get all users   => EQUIVILANT TO SELECT * FROM users;

router.get("/", (req, res) => {
  // access to our user model and run .findAll() Method

  User.findAll({
    // hide password for retriving user
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single user   => SELECT * FROM users WHERE id = 1
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => {
      // didn't find data => no id not found.
      if (!dbUserData) {
        res.status(404).json({
          message: "There's no user found with this id... Try again!",
        });
        return;
      }
      // else give result
      res.json(dbUserData);
    })
    .catch((err) => {
      // tell me the error
      console.log(err);
      //   give status 500
      res.status(500).json(err);
    });
});

// create new user
router.post("/", (req, res) => {
  // expects {username, email, password inputs}

  //   ! INSERT INTO users (username, email, password)

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update user, UPDATE using ID
router.put(":id", (req, res) => {
  // expects {username, email, password}

  User.update(req.body, {
    // condition meet, extract search parameters
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({
          message: "Theres no user found with that ID.. Try Again!",
        });
        res.json(dbUserData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete user using id
router.delete("/:id", (req, res) => {
  User.destroy({
    // get searched parameters
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res
          .status(404)
          .json({ message: "There's no user with that ID... Try Again!" });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
