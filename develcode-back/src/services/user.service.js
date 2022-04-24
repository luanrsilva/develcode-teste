const User = require('../models/user.model');
let httpStatusCodes = require('http-status-codes');

const userService = (function () {

    const _createUser = async (req, callback) => {
        // console.log(req)
        await User.create({
            code: req.code,
            name: req.name,
            birthDate: req.birthDate,
            photo: req.photo
        }).then(() => {
            return callback({
                status: httpStatusCodes.OK,
                message: 'Usuário criado com sucesso'
            })
        }).catch(err => {
            return callback({
                status: httpStatusCodes.BAD_REQUEST,
                message: 'Erro ao criar novo usuário: ' + err
            })
        })
    }

    const _getUsers = async (callback) => {
        await User.findAll().then((users) => {
            return callback({
                status: httpStatusCodes.OK,
                message: '',
                data: users
            })
        }).catch(err => {
            return callback({
                status: httpStatusCodes.NOT_FOUND,
                message: 'Erro ao recuperar usuários: ' + err
            })
        })
    }

    // const _deleteUser = async (req, callback) => {
    //     await User.destroy().then((users) => {
    //         return callback({
    //             status: httpStatusCodes.OK,
    //             message: '',
    //             data: users
    //         })
    //     }).catch(err => {
    //         return callback({
    //             status: httpStatusCodes.NOT_FOUND,
    //             message: 'Erro ao recuperar usuários: ' + err
    //         })
    //     })
    // }

    return {
        createUser: _createUser,
        getUsers: _getUsers,
        // deleteUser: _deleteUser
    }
})();

module.exports = userService;