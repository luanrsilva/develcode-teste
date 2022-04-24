const Sequelize = require('sequelize');

const sequelize = new Sequelize('develcode', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate().then(function() {
//     console.log("Conectado com sucesso");
// }).catch(err => console.log("Falha ao conectar:" + err))

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
