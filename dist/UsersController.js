"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var config_1 = __importDefault(require("./config"));
var AppError_1 = __importDefault(require("./AppError"));
var usuarios;
usuarios = [];
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.auth = function (request, response) {
        var _a = request.body, email = _a.email, password = _a.password;
        var userExists;
        userExists = false;
        // Verifica se existe um email e senha
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email === email && usuarios[i].password === password) {
                userExists = true;
            }
        }
        if (!userExists) {
            // Gera uma exceção de erro
            throw new AppError_1.default("E-mail ou senha incorretos!", 401);
        }
        response.json({
            token: config_1.default,
        });
    };
    UsersController.prototype.index = function (request, response) {
        response.json(usuarios);
    };
    UsersController.prototype.create = function (request, response) {
        var _a = request.body, name = _a.name, cpf = _a.cpf, email = _a.email, password = _a.password;
        var uuid = (0, uuid_1.v4)();
        var novoUsuario = {
            id: uuid,
            name: name,
            cpf: cpf,
            email: email,
            password: password
        };
        usuarios.push(novoUsuario);
        response.json(novoUsuario);
    };
    UsersController.prototype.update = function (req, res) {
        var id = req.params.id;
        var userExists;
        userExists = false;
        // Verifica se existe um usuário
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == id) {
                userExists = true;
            }
        }
        if (!userExists) {
            // Gera uma exeption de erro
            throw new AppError_1.default("Usuário não encontrado!");
        }
        var _a = req.body, name = _a.name, cpf = _a.cpf, email = _a.email, password = _a.password;
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == id) {
                // Atualiza as informações do id específico
                usuarios[i].name = name;
                usuarios[i].cpf = cpf;
                usuarios[i].email = email;
                usuarios[i].password = password;
            }
        }
        res.status(200).json({
            name: name,
            cpf: cpf,
            email: email,
            password: password,
        });
    };
    UsersController.prototype.delete = function (req, res) {
        var id = req.params.id;
        var userExists;
        userExists = false;
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == id) {
                userExists = true;
            }
        }
        if (!userExists) {
            // Gera uma exeption de erro
            throw new AppError_1.default("Usuário não encontrado!");
        }
        // percorre o array procurando o id passado por parametro
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == id) {
                //exclui o objeto com id encontrado
                usuarios.splice(i, 1);
            }
        }
        res.json([]);
    };
    return UsersController;
}());
exports.default = UsersController;
