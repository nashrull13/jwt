module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("books", {
    title: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    published_date: {
      type: Sequelize.STRING
    },
    pages: {
      type: Sequelize.STRING
    },
    language: {
      type: Sequelize.STRING
    },
    published_id: {
      type: Sequelize.STRING
    }
  });
  return Book;
};
