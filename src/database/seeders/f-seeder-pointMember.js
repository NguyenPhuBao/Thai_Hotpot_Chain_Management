'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'pointMembers',
            [
                {
                    phoneNumber: '0909123456',
                    value: 150,
                    otpCode: null,
                    status: false,
                    createdAt: '2024-08-22 14:58:58',
                    updatedAt: '2024-08-22 14:58:58',
                },
                {
                    phoneNumber: '0909234567',
                    value: 80,
                    otpCode: null,
                    status: false,
                    createdAt: '2024-08-22 14:58:58',
                    updatedAt: '2024-08-22 14:58:58',
                },
                {
                    phoneNumber: '0909345678',
                    value: 200,
                    otpCode: null,
                    status: false,
                    createdAt: '2024-08-22 14:58:58',
                    updatedAt: '2024-08-22 14:58:58',
                },
                {
                    phoneNumber: '0909456789',
                    value: 50,
                    otpCode: null,
                    status: false,
                    createdAt: '2024-08-22 14:58:58',
                    updatedAt: '2024-08-22 14:58:58',
                },
                {
                    phoneNumber: '0909567890',
                    value: 300,
                    otpCode: null,
                    status: false,
                    createdAt: '2024-08-22 14:58:58',
                    updatedAt: '2024-08-22 14:58:58',
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('pointMembers', null, {});
    },
};
