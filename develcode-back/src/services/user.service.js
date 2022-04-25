const User = require('../models/user.model');
let httpStatusCodes = require('http-status-codes');

const userService = (function () {

    const _createUser = async (req, callback) => {
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

    const _updateUser = async (userId, user, callback) => {
        await User.update(user, {
            where: {
                id: userId
            }
        }).then(() => {
            return callback({
                status: httpStatusCodes.OK,
                message: 'Usuário atualizado com sucesso'
            })
        }).catch(err => {
            return callback({
                status: httpStatusCodes.BAD_REQUEST,
                message: 'Erro ao editar usuário: ' + err
            })
        })
    }

    const _deleteUser = async (userId, callback) => {
        await User.destroy({
            where: {
                id: userId
            }
        }).then(() => {
            return callback({
                status: httpStatusCodes.OK,
                message: 'Usuário excluído com sucesso'
            })
        }).catch(err => {
            return callback({
                status: httpStatusCodes.BAD_REQUEST,
                message: 'Erro ao excluir usuário: ' + err
            })
        })
    }

    return {
        createUser: _createUser,
        getUsers: _getUsers,
        updateUser: _updateUser,
        deleteUser: _deleteUser
    }
})();

module.exports = userService;