// Função para mostrar mensagens de erro personalizadas
export default class AppError{
    // Reandoly é "Somente leitura"
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400){
        this.message = message;
        this.statusCode = statusCode;
    }
}