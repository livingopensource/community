'use strict';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { v4: uuidv4 } = require('uuid');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // Add roles
    await queryInterface.bulkInsert('roles', [{
      id: uuidv4(),
      name: "platform-admin",
      description: "Platform Admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      name: "admin",
      description: "Admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      name: "user",
      description: "User",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    // Remove roles
    await queryInterface.bulkDelete('roles', [], {});
  }
};
