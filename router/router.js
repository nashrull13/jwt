const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken.js");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const orderController = require("../controller/orderController.js");

module.exports = function(app) {
  //BOOK
  /* GET book. */
  app.get("/books", [authJwt.verifyToken], userController.users, function(
    req,
    res,
    next
  ) {
    model.books
      .findAll({})
      .then(book =>
        res.json({
          error: false,
          data: book
        })
      )
      .catch(error =>
        res.json({
          error: true,
          data: [],
          error: error
        })
      );
  });

  //GET book by ID
  app.get("/books/:id", [authJwt.verifyToken], userController.users, function(
    req,
    res,
    next
  ) {
    model.books
      .findAll(
        {},
        {
          where: {
            id: book_id
          }
        }
      )
      .then(book =>
        res.json({
          error: false,
          data: book
        })
      )
      .catch(error =>
        res.json({
          error: true,
          data: [],
          error: error
        })
      );
  });

  /* POST book. */
  app.post(
    "/books",
    [authJwt.verifyToken, authJwt.isAdmin],
    // userController.managementBoard,

    function(req, res, next) {
      const { title, author, page, language, publisher_id } = req.body;
      model.books
        .create({
          title: title,
          author: author,
          page: page,
          language: language,
          publisher_id: publisher_id
        })
        .then(book =>
          res.status(201).json({
            error: false,
            data: book,
            message: "New book has been created."
          })
        )
        .catch(error =>
          res.json({
            error: true,
            data: [],
            error: "Hanya Admin yang bisa menambahkan buku!"
          })
        );
    }
  );

  /* UPDATE book. */
  app.put(
    "/books/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    // userController.managementBoard,
    function(req, res, next) {
      const book_id = req.params.id;
      const { title, author, page, language, publisher_id } = req.body;
      model.books
        .update(
          {
            title: title,
            author: author,
            page: page,
            language: language,
            publisher_id: publisher_id
          },
          {
            where: {
              id: book_id
            }
          }
        )
        .then(book =>
          res.json({
            error: false,
            message: "book has been updated."
          })
        )
        .catch(error =>
          res.json({
            error: true,
            error: error
          })
        );
    }
  );
  /* DELETE book. */
  app.delete(
    "/books/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    // userController.managementBoard,
    function(req, res, next) {
      const book_id = req.params.id;
      model.books
        .destroy({
          where: {
            id: book_id
          }
        })

        .then(status =>
          res.json({
            error: false,
            message: "book has been delete."
          })
        )
        .catch(error =>
          res.json({
            error: true,
            error: error
          })
        );
    }
  );

  //USER

  // Auth
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  app.post("/api/auth/signin", authController.signin);
  // get all user
  app.get("/api/users", [authJwt.verifyToken], userController.users);

  // get 1 user according to roles
  app.get("/api/test/user", [authJwt.verifyToken], userController.userContent);
  app.get(
    "/api/test/pm",
    [authJwt.verifyToken, authJwt.isPmOrAdmin],
    userController.managementBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );
  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });
  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};
