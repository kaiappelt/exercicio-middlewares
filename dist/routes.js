"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var UsersController_1 = __importDefault(require("./UsersController"));
var routes = (0, express_1.Router)();
var usersController = new UsersController_1.default;
routes.get("/", 
//MIDDLEWARE
usersController.index);
routes.post("/create-user", 
//MIDDLEWARE
// Validação dos campos utilizando o celebrate
(0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required().required(),
        cpf: celebrate_1.Joi.string().required().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
    _a)), 
// Chama o controller
usersController.create);
// LOGIN
routes.post("/auth", 
//MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
(0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
    _b)), 
// Chama o controller
usersController.auth);
routes.put("/update-user/:id", 
//MIDDLEWARE DE AUTENTICAÇÃO
//MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
(0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required().required(),
        cpf: celebrate_1.Joi.string().required().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _c)), usersController.update);
routes.delete("/delete-user/:id", 
//MIDDLEWARE DE AUTENTICAÇÃO
//MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
(0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _d)), usersController.delete);
exports.default = routes;
