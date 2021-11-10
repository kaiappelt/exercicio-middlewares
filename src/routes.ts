import { Router } from "express";
import { celebrate, Joi, Segments, errors } from 'celebrate';
import isAuthenticated from "./middlewares/isAuthnticated";
import UsersController from "./UsersController";

let routes = Router();

let usersController = new UsersController;

routes.get(
    "/",
    //MIDDLEWARE
    usersController.index
);

routes.post(
    "/create-user", 
    //MIDDLEWARE
    // Validação dos campos utilizando o celebrate
    celebrate({
        [Segments.BODY]:{
            name: Joi.string().required().required(),//campo obrigatorio
            cpf: Joi.string().required().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    // Chama o controller
    usersController.create
);

// LOGIN
routes.post(
    "/auth", 
    //MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
    celebrate({
        [Segments.BODY]:{
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    // Chama o controller
    usersController.auth
);

routes.put(
    "/update-user/:id",
    //MIDDLEWARE DE AUTENTICAÇÃO
    //MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
    celebrate({
        [Segments.BODY]:{
            name: Joi.string().required().required(),//campo obrigatorio
            cpf: Joi.string().required().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required(),
        }
    }),

    usersController.update
)

routes.delete(
    "/delete-user/:id",
      //MIDDLEWARE DE AUTENTICAÇÃO
      //MIDDLEWARE DE VALIDAÇÃO DOS CAMPOS
      celebrate({
          [Segments.PARAMS]:{
              id: Joi.string().uuid().required(),
          }
      }),
      usersController.delete
);

export default routes;