'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'typeOfFoods',
            [
                {
                    title: 'Món chính',
                    status: false,
                    createdAt: '2024-08-22 14:58:58',
                    updatedAt: '2024-08-22 14:58:58',
                },
                {
                    title: 'Món phụ',
                    status: false,
                    createdAt: '2024-08-22 14:58:58',
                    updatedAt: '2024-08-22 14:58:58',
                },
                {
                    title: 'Đồ uống',
                    status: false,
                    createdAt: '2024-08-22 14:58:58',
                    updatedAt: '2024-08-22 14:58:58',
                },
                {
                    title: 'Món ăn kèm',
                    status: false,
                    createdAt: '2024-08-22 14:58:58',
                    updatedAt: '2024-08-22 14:58:58',
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('typeOfFoods', null, {});
    },
};
