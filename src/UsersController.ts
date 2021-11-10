import { Request, Response } from "express";
import { v4 } from "uuid";
import token from "./config";
import AppError from "./AppError";

let usuarios: Array<any>;
usuarios = [];

interface IRequest{
    name: string,
    cpf: string,
    email: string,
    password: string,
}

export default class UsersController {
    auth(request: Request, response: Response) {
        let { email, password } = request.body;

        let userExists:boolean;
        userExists = false;
        
        // Verifica se existe um email e senha
        for (let i = 0; i < usuarios.length; i++){
            if(usuarios[i].email === email && usuarios[i].password === password) {
                userExists = true;
            }
        }

        if(!userExists){
            // Gera uma exceção de erro
            throw new AppError("E-mail ou senha incorretos!", 401);
        } 

        response.json({
            token,
        })
    }

    index(request: Request, response: Response) {
        response.json(usuarios);
    }

    create(request: Request, response: Response) {
        let { name, cpf, email, password } = request.body;

        let uuid = v4();

        let novoUsuario = { 
            id:uuid,
            name, 
            cpf, 
            email,
            password
        };

        usuarios.push(novoUsuario);

        response.json(novoUsuario);
    }

    update(req:Request, res:Response){
        const { id } = req.params;

        let userExists:boolean;
        userExists = false;
        
        // Verifica se existe um usuário
        for (let i = 0; i < usuarios.length; i++){
            if(usuarios[i].id == id) {
                userExists = true;
            }
        }

        if(!userExists){
            // Gera uma exeption de erro
            throw new AppError("Usuário não encontrado!")
        }

        let {
            name,
            cpf,
            email,
            password,
        }: IRequest = req.body;

        for (let i = 0; i < usuarios.length; i++){
            if(usuarios[i].id == id) {
                // Atualiza as informações do id específico
                usuarios[i].name = name;
                usuarios[i].cpf = cpf;
                usuarios[i].email = email;
                usuarios[i].password = password;
            }
        }
         
        res.status(200).json(
            {
                name,
                cpf,
                email,
                password,
            }
        );
    }

    delete(req:Request, res:Response){
        const { id } = req.params;

        let userExists:boolean;
        userExists = false;

        for (let i = 0; i < usuarios.length; i++){
            if(usuarios[i].id == id) {
                userExists = true;
            }
        }

        if(!userExists){
            // Gera uma exeption de erro
            throw new AppError("Usuário não encontrado!")
        }

        // percorre o array procurando o id passado por parametro
        for (let i = 0; i < usuarios.length; i++){
            if(usuarios[i].id == id) {
                //exclui o objeto com id encontrado
                usuarios.splice(i, 1);
            }
        }

        res.json([]);
    }
}