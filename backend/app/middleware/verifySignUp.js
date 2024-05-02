const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const userByUsername = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (userByUsername) {
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }

    const userByEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userByEmail) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while checking duplicate username or email."
    });
  }
};

const checkRolesExisted = (req, res, next) => {
  try {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          return res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
        }
      }
    }
    
    next();
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while checking roles existence."
    });
  }
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;