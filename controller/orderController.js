const db = require("../app/db.js");
const Book = db.book;
const User = db.user;
const asyncMiddleware = require("express-async-handler");

//Insert Order
exports.buatOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const books = await Book.findOne({
    where: { id: req.params.id }
  });
  await user.addBooks(books);
  res.status(201).send({
    user: user,
    books: books,
    status: "order berhasil!"
  });
});

//Show Orders
exports.liatsemuaOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: [
          "title",
          "author",
          "pages",
          "published_date",
          "language",
          "published_id"
        ],
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

//Show order by id
exports.liatOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: [
          "title",
          "author",
          "pages",
          "published_date",
          "language",
          "published_id"
        ],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  console.log("cek");
  res.status(200).json({
    description: "User order page",
    user: user
  });
});
