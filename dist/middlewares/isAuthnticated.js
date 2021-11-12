"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config"));
var AppError_1 = __importDefault(require("../AppError"));
function isAuthenticated(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default("Token não informado!");
    }
    var _a = authHeader.split(' '), userToken = _a[1];
    if (userToken === config_1.default) {
        return next();
    }
    else {
        throw new AppError_1.default("Token inválido", 401);
    }
}
exports.default = isAuthenticated;
