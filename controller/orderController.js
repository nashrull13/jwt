const db = require("../app/db.js");
const User = db.user;
const Book = db.book;

const asyncMiddleware = require("express-async-handler");

exports.ordering = asyncMiddleware(async (req, res) => {
  // Save order to Database
  console.log("Processing func -> Ordering");
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const books = await Book.findOne({
    where: { id: req.params.id }
  });

  await user.addBooks(books);
  console.log("1");
  res.status(201).send({
    status: "Order registered successfully!"
  });
});

//show all orders
exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "pages", "language", "publisher_id"],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "All Order",
    user: user
  });
});

//find order by id ((not used))
exports.userContent = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: ["title", "author", "pages", "language", "publisher_id"],
        through: {
          attributes: ["userId", "bookId"]
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
        model: Book,
        attributes: ["title", "author", "pages", "language", "publisher_id"],
        through: {
          attributes: ["userId", "bookId"]
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
        model: Book,
        attributes: ["title", "author", "pages", "language", "publisher_id"],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Management Board",
    user: user
  });
});
