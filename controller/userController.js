const db = require("../app/db.js");
const User = db.user;
const Role = db.role;
const Book = db.book;
const asyncMiddleware = require("express-async-handler");
const express = require("express");

var app = express();
app.use(express.json());

exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "All User",
    user: user
  });
});

exports.userContent = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "User Content Page",
    user: user
  });
});

exports.adminBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Admin Board",
    user: user
  });
});
exports.managementBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Management Board",
    user: user
  });
});
