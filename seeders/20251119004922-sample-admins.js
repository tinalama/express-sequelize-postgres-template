"use strict";
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(8);
const moment = require("moment");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Admins", [
      {
        f_name: "Tina",
        l_name: "Lama",
        email: "tina@gmail.com",
        password: bcrypt.hashSync("password", salt),
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
      },
      {
        f_name: "Sharnam",
        l_name: "Dhakhwa",
        email: "sharnam@gmail.com",
        password: bcrypt.hashSync("password", salt),
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  },
};
