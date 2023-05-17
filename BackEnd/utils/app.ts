import express from "express";
import {Application} from 'express';
import cors from 'cors';
import {json} from 'body-parser';
import { router } from "../router/routes";



function createServer() {


    const app : Application = express();

    //permet d'autoriser toutes les origines à acceder au serveur
    app.use(cors());
    //fonction middleware analysant les requetes entrantes json
    // et  place ces données dans le req.body
    app.use(json());

    //création du serveur
    app.use('/', router);



    return app;
}

export default createServer;