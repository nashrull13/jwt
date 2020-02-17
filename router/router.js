module.exports = function(app) {
  const verifySignUp = require("./verifySignUp");
  const authJwt = require("./verifyJwtToken");
  const authController = require("../controller/authController.js");
  const userController = require("../controller/userController.js");
  const bookController = require("../controller/bookController.js");
  const orderController = require("../controller/orderController.js");
  const db = require("../app/db.js");
  const Book = db.book;
  const express = require("express");
  const {
    bookValidationRules,
    userValidationRules,
    validate
  } = require("../controller/validator.js");

  app.use(express.json());

  //------------------------------------------------USERS-----------------------------------------//

  //Register
  app.post(
    "/register",
    [
      userValidationRules(),
      validate,
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );

  //Login
  app.post("/login", authController.signin);

  // Show all user
  app.get("/api/users", [authJwt.verifyToken], userController.users);

  // check user
  app.get("/api/test/user", [authJwt.verifyToken], userController.userContent);

  //check role pm
  app.get(
    "/api/test/pm",
    [authJwt.verifyToken, authJwt.isPmOrAdmin],
    userController.managementBoard
  );

  //check role admin
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );

  //------------------------------------------------BOOKS-----------------------------------------//

  // Insert book
  app.post(
    "/books",
    [authJwt.verifyToken, authJwt.isAdmin, bookValidationRules(), validate],
    bookController.tambahBuku
  );

  //Update book
  app.put("/books/:id", [authJwt.verifyToken], bookController.rubahBuku);

  //Delete book
  app.delete("/books/:id", [authJwt.verifyToken], bookController.hapusBuku);

  //Show all books
  app.get("/books", [authJwt.verifyToken], bookController.tampilsemuaBuku);

  //Show book by id
  app.get("/books/:id", [authJwt.verifyToken], bookController.tampilBuku);

  //------------------------------------------------ORDERS-----------------------------------------//

  //Making order
  app.post("/orders/:id", [authJwt.verifyToken], orderController.buatOrder);

  //Show all orders
  app.get("/orders", [authJwt.verifyToken], orderController.liatsemuaOrder);

  //Show order by id
  app.get("/orders/:id", [authJwt.verifyToken], orderController.liatOrder);

  //------------------------------------------------ ERRORS-----------------------------------------//
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
