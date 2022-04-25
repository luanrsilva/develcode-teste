const db = require('../db/db')

const User = db.sequelize.define('users', {
    code: {
        type: db.Sequelize.INTEGER,
        unique: true
    },
    name: {
        type: db.Sequelize.STRING
    },
    birthDate: {
        type: db.Sequelize.STRING
    }
});

// User.sync({force: true})
module.exports = User;