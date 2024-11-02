'use strict';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('memberships', [{
    id: uuidv4(),
    name: "Explorer",
    subTitle: "This tier is perfect for those starting their journey in the open-source world or looking to stay informed about industry developments.",
    description: "Access to open-source resources and repositories \nMonthly updates on industry news and trends \nParticipation in professional online forums \nDiscounts on training courses, webinars, and events \nOpportunity to join live sessions on requested topics",
    amount: 20,
    currency: "USD",
    period: 12,
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    id: uuidv4(),
    name: "Developer",
    subTitle: "Ideal for professionals seeking to deepen their expertise and expand their network within the open-source community.",
    description: "All Explorer tier benefits \nAccess to exclusive webinars and virtual workshops \nFree or discounted entry to conferences and networking events \nPriority access to new open-source project releases \nOpportunities to contribute to high-profile open-source projects \nReduced rates for Linux certification courses",
    amount: 50,
    currency: "USD",
    period: 12,
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    id: uuidv4(),
    name: "Professional",
    subTitle: "This tier is designed for individuals aiming for significant career advancement, offering tailored support and recognition.",
    description: "All Professional benefits \nOne-on-one mentorship sessions with experienced IT professionals \nPersonalized career development plans and guidance \nRecognition as a Premium Member on the LOS website",
    amount: 100,
    currency: "USD",
    period: 12,
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    id: uuidv4(),
    name: "Executive",
    subTitle: "For those who seek an elite experience, this tier offers unmatched access to premium resources, top-tier networking opportunities, and direct engagement with industry pioneers.",
    description: "All Executive tier benefits \nExclusive live sessions with renowned instructor Sander Van Vugt \nEarly access to high-level training and certification programs \nVIP invitations to global open-source conferences and events \nPersonalized introductions to industry leaders and experts \nPriority support and direct access to the Foundation’s leadership team",
    amount: 200,
    currency: "USD",
    period: 12,
    createdAt: new Date(),
    updatedAt: new Date()
   }], {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('memberships', [], {});
  }
};
