var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("common"));
var cors = require("cors");

//app.use(cors());

require("./router/router.js")(app);

const db = require("./app/db.js");
const Role = db.role;

// // //force: true will drop the table if it already exists (comment this part after first run, to disable migration)
// db.sequelize.sync({ force: true }).then(() => {
//   console.log(`Drop and Resync with { force: true }`);
//   initial();
// });
// require("./router/router.js")(app);

//sg mail
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: "sutrisnaasep848@gmail.com",
//   from: "test@example.com",
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>"
// };
// sgMail.send(msg);

// Create a Server
var server = app.listen(8092, "127.0.0.1", function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});

// function initial() {
//   Role.create({
//     id: 1,
//     name: "USER"
//   });

//   Role.create({
//     id: 2,
//     name: "ADMIN"
//   });

//   Role.create({
//     id: 3,
//     name: "PM"
//   });
// }

// function book() {
//   Book.create({
//     title: "Bobo",
//     author: "Tatang S",
//     published_date: "2019-02-20",
//     pages: "50",
//     language: "sunda",
//     published_id: "123"
//   });
// }
