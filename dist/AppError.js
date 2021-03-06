"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Função para mostrar mensagens de erro personalizadas
var AppError = /** @class */ (function () {
    function AppError(message, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.message = message;
        this.statusCode = statusCode;
    }
    return AppError;
}());
exports.default = AppError;
