module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("books", {
    title: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    page: {
      type: Sequelize.INTEGER
    },
    language: {
      type: Sequelize.STRING
    },
    publisher_id: {
      type: Sequelize.INTEGER
    }
  });
  return Book;
};
