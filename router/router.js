module.exports = function(app) {
  const verifySignUp = require("./verifySignUp");
  const authJwt = require("./verifyJwtToken");
  const authController = require("../controller/authController.js");
  const userController = require("../controller/userController.js");
  const bookController = require("../controller/bookController.js");
  const db = require("../app/db.js");
  const Book = db.book;
  const express = require("express");

  app.use(express.json());

  // Auth
  app.post(
    "/register",
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  app.post("/login", authController.signin);
  // get all user
  app.get("/api/users", [authJwt.verifyToken], userController.users);
  // get 1 user according to roles

  app.post(
    "/books",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.tambahBuku
  );

  app.get("/books", [authJwt.verifyToken], bookController.tampilsemuaBuku);

  app.get("/books/:id", [authJwt.verifyToken], bookController.tampilBuku);

  app.put("/books/:id", [authJwt.verifyToken], bookController.rubahBuku);

  app.delete("/books/:id", [authJwt.verifyToken], bookController.hapusBuku);

  app.get("/api/test/user", [authJwt.verifyToken], userController.userContent);

  app.get("/orders", [authJwt.verifyToken], bookController.liatsemuaOrder);

  app.get("/orders/:id", [authJwt.verifyToken], bookController.liatOrder);

  app.post("/orders/:id", [authJwt.verifyToken], bookController.buatOrder);
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
